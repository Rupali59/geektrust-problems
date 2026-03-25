#!/usr/bin/env node
/**
 * Pulls ALL coding-problem metadata + embedded statements from Geektrust's
 * candidate app bundle (same JSON as https://www.geektrust.com/candidates/coding/challenges).
 * Also downloads official Problem Set PDFs (PS1, PS2, PS3, PS5) for the four bundle stubs
 * into data/geektrust/pdfs/ and links them from each stub's problems/<slug>.json.
 *
 * Usage: node scripts/sync-geektrust-data.mjs
 *
 * Optional: GEEKTRUST_SHARE_BADGE_ID=1644409049 — fetches public OG tags from
 * https://www.geektrust.com/api/share/badges/<id> and writes share-summary.json
 */

import { writeFile, mkdir } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, "..")
const OUT = join(ROOT, "data", "geektrust")

const CHALLENGES_PAGE = "https://www.geektrust.com/candidates/coding/challenges"
const DETAILED_BASE = "https://www.geektrust.com/candidates/coding/detailed"

/** Bundle has no embedded statement for these slugs; official spec is the Problem Set PDF. */
const STUB_SLUG_TO_PROBLEM_SET = {
  family: "PS1",
  war: "PS2",
  traffic: "PS3",
  "tame-of-thrones": "PS5",
}

async function fetchText(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${url} -> ${res.status}`)
  return res.text()
}

async function fetchBinary(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${url} -> ${res.status}`)
  return Buffer.from(await res.arrayBuffer())
}

function extractMainScript(html) {
  const m = html.match(/src="(\/candidates\/main\.[a-f0-9]+\.js)"/)
  if (!m) throw new Error("Could not find /candidates/main.*.js in challenges page")
  return new URL(m[1], "https://www.geektrust.com").href
}

function parseJsonParseLiterals(js) {
  const re = /JSON\.parse\('((?:[^'\\]|\\.)*)'\)/g
  const catalog = new Map()
  const fullBySlug = new Map()
  for (const m of js.matchAll(re)) {
    let raw = m[1]
      .replace(/\\'/g, "'")
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\")
    if (raw.length > 4_000_000) continue
    let obj
    try {
      obj = JSON.parse(raw)
    } catch {
      continue
    }
    const slug = obj.slug ?? obj.default?.slug
    const problemId = obj.problemId ?? obj.default?.problemId
    if (!slug || !problemId) continue
    if (!catalog.has(slug)) {
      catalog.set(slug, { slug, problemId })
    }
    if (obj.problemStatement || obj.sampleInputOutput) {
      fullBySlug.set(slug, obj)
    }
  }
  return { catalog, fullBySlug }
}

async function fetchShareSummary(badgeId) {
  const url = `https://www.geektrust.com/api/share/badges/${badgeId}`
  const html = await fetchText(url)
  const pick = (prop) => {
    const r = new RegExp(`property=['"]${prop}['"]\\s+content=['"]([^'"]+)['"]`, "i")
    const x = html.match(r)
    return x ? x[1].replace(/&amp;/g, "&") : null
  }
  return {
    badgeShareId: badgeId,
    sourceUrl: url,
    ogTitle: pick("og:title"),
    ogDescription: pick("og:description"),
    ogImage: pick("og:image"),
    fetchedAt: new Date().toISOString(),
  }
}

async function main() {
  const html = await fetchText(CHALLENGES_PAGE)
  const mainJsUrl = extractMainScript(html)
  const bundle = await fetchText(mainJsUrl)
  const { catalog, fullBySlug } = parseJsonParseLiterals(bundle)

  await mkdir(join(OUT, "problems"), { recursive: true })

  const entries = [...catalog.values()].sort((a, b) => a.problemId.localeCompare(b.problemId))
  const generatedAt = new Date().toISOString()
  const withFull = [...fullBySlug.keys()]
  const problemSetsToFetch = [...new Set(Object.values(STUB_SLUG_TO_PROBLEM_SET))]

  const pdfDir = join(OUT, "pdfs")
  await mkdir(pdfDir, { recursive: true })
  for (const ps of problemSetsToFetch) {
    const pdfUrl = `https://www.geektrust.com/api/pdf/open/${ps}`
    try {
      const buf = await fetchBinary(pdfUrl)
      await writeFile(join(pdfDir, `${ps}.pdf`), buf)
      console.log("Wrote PDF", join("data/geektrust/pdfs", `${ps}.pdf`), `(${buf.length} bytes)`)
    } catch (e) {
      console.warn("PDF fetch failed:", ps, e.message)
    }
  }

  await writeFile(
    join(OUT, "sync-meta.json"),
    JSON.stringify(
      {
        generatedAt,
        challengesPage: CHALLENGES_PAGE,
        mainJsUrl,
        bundleBytes: bundle.length,
        catalogProblemCount: entries.length,
        problemsWithEmbeddedStatement: withFull.length,
        problemsStubOnly: entries.length - withFull.length,
        problemSetPdfsFetched: problemSetsToFetch,
      },
      null,
      2
    ) + "\n"
  )

  await writeFile(join(OUT, "catalog.json"), JSON.stringify({ generatedAt, problems: entries }, null, 2) + "\n")

  const problemsIndex = entries.map((e) => ({
    slug: e.slug,
    problemId: e.problemId,
    detailedUrl: `${DETAILED_BASE}/${e.slug}`,
    hasEmbeddedPayload: fullBySlug.has(e.slug),
    hasProblemSetPdf: Boolean(STUB_SLUG_TO_PROBLEM_SET[e.slug]),
  }))

  await writeFile(join(OUT, "problems-index.json"), JSON.stringify({ generatedAt, problems: problemsIndex }, null, 2) + "\n")

  for (const { slug, problemId } of entries) {
    const full = fullBySlug.get(slug)
    const problemSetPdf = STUB_SLUG_TO_PROBLEM_SET[slug]
    const pdfUrl = problemSetPdf ? `https://www.geektrust.com/api/pdf/open/${problemSetPdf}` : null
    const localPdfRelative = problemSetPdf ? `pdfs/${problemSetPdf}.pdf` : null
    const payload =
      full ??
      (problemSetPdf
        ? {
            slug,
            problemId,
            note: "No problemStatement/sampleInputOutput in the candidate app bundle — use problemSetPdf / localPdf / pdfUrl for the full spec.",
            detailedUrl: `${DETAILED_BASE}/${slug}`,
            problemSetPdf,
            pdfUrl,
            localPdf: localPdfRelative,
          }
        : {
            slug,
            problemId,
            note: "No problemStatement/sampleInputOutput in the app bundle for this slug — open detailedUrl on Geektrust for the full spec.",
            detailedUrl: `${DETAILED_BASE}/${slug}`,
          })
    await writeFile(join(OUT, "problems", `${slug}.json`), JSON.stringify(payload, null, 2) + "\n")
  }

  const shareId = process.env.GEEKTRUST_SHARE_BADGE_ID
  if (shareId && /^\d+$/.test(shareId)) {
    const summary = await fetchShareSummary(shareId)
    await writeFile(join(OUT, "share-summary.json"), JSON.stringify(summary, null, 2) + "\n")
  }

  console.log("Wrote", OUT)
  console.log("Catalog problems:", entries.length)
  console.log("With embedded statement JSON:", withFull.length)
  console.log("Stub-only:", entries.length - withFull.length)
  console.log("Main JS:", mainJsUrl)
  if (shareId) console.log("Share summary: share-summary.json")
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
