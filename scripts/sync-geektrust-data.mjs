#!/usr/bin/env node
/**
 * Pulls coding-problem metadata + statements from Geektrust's candidate app bundle
 * (same JSON embedded in https://www.geektrust.com/candidates/coding/challenges).
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
const REPO_SLUGS = ["metro-card", "power-of-g-man", "geekdemy", "tame-of-thrones"]

async function fetchText(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${url} -> ${res.status}`)
  return res.text()
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
  const matches = js.matchAll(re)
  for (const m of matches) {
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

  await writeFile(
    join(OUT, "sync-meta.json"),
    JSON.stringify(
      {
        generatedAt,
        challengesPage: CHALLENGES_PAGE,
        mainJsUrl,
        bundleBytes: bundle.length,
        problemCountInCatalog: entries.length,
        repoSlugs: REPO_SLUGS,
      },
      null,
      2
    ) + "\n"
  )

  await writeFile(join(OUT, "catalog.json"), JSON.stringify({ generatedAt, problems: entries }, null, 2) + "\n")

  for (const slug of REPO_SLUGS) {
    const full =
      fullBySlug.get(slug) ?? {
        slug,
        problemId: catalog.get(slug)?.problemId,
        note: "minimal payload in bundle",
      }
    await writeFile(join(OUT, "problems", `${slug}.json`), JSON.stringify(full, null, 2) + "\n")
  }

  const shareId = process.env.GEEKTRUST_SHARE_BADGE_ID
  if (shareId && /^\d+$/.test(shareId)) {
    const summary = await fetchShareSummary(shareId)
    await writeFile(join(OUT, "share-summary.json"), JSON.stringify(summary, null, 2) + "\n")
  }

  console.log("Wrote", OUT)
  console.log("Catalog problems:", entries.length)
  console.log("Main JS:", mainJsUrl)
  if (shareId) console.log("Share summary: share-summary.json")
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
