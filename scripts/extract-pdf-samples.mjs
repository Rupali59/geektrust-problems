#!/usr/bin/env node
/**
 * Extract sample input/output from Problem Set PDFs into each stub challenge folder.
 *
 * Prerequisites: PDFs under data/geektrust/pdfs/ (run sync-geektrust-data.mjs first).
 * Setup: cd scripts && npm install
 *
 * Usage:
 *   node extract-pdf-samples.mjs
 *   node extract-pdf-samples.mjs --dump   # writes data/geektrust/extracted-text/PSn.txt
 */

import { readFile, mkdir, writeFile, copyFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

import pdfParse from "pdf-parse"
import { STUB_SLUG_TO_PROBLEM_SET } from "./geektrust-stub-pdfs.mjs"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, "..")
const DATA = join(ROOT, "data", "geektrust")
const PDF_DIR = join(DATA, "pdfs")
const DUMP_DIR = join(DATA, "extracted-text")

function norm(s) {
  return String(s)
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

function normLines(s) {
  return norm(s)
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .join("\n")
}

function ensureOut(s) {
  const t = normLines(s)
  return t.endsWith("\n") ? t : `${t}\n`
}

/** PS1 — curated from PDF text (Meet the Family); spacing normalized. */
function samplesFamily() {
  return [
    {
      input: `ADD_CHILD Chitra Aria Female
GET_RELATIONSHIP Lavnya Maternal-Aunt
GET_RELATIONSHIP Aria Siblings`,
      output: `CHILD_ADDITION_SUCCEEDED
Aria
Jnki Ahit`,
    },
    {
      input: `ADD_CHILD Pjali Srutak Male
GET_RELATIONSHIP Pjali Son`,
      output: `PERSON_NOT_FOUND
PERSON_NOT_FOUND`,
    },
    {
      input: `ADD_CHILD Asva Vani Female
GET_RELATIONSHIP Vasa Siblings`,
      output: `CHILD_ADDITION_FAILED
NONE`,
    },
  ]
}

/** PS2 — parse from extracted PDF text (matchAll, not RegExp#exec). */
function samplesWar(text) {
  const re =
    /Input:\s*(Falicornia attacks[^\n]+?)\s*Expected Output:\s*(Lengaburu deploys[^\n]+)/gi
  const pairs = []
  for (const m of text.matchAll(re)) {
    pairs.push({
      input: m[1].trim(),
      output: m[2].trim(),
    })
  }
  return pairs
}

/** PS3 — two problems × scenarios; strip "Input:" / "Expected Output:" prefixes. */
function samplesTraffic(text) {
  const parts = text.split(/problem 2:\s*mission impossible/i)
  const p1 = parts[0] || text
  const p2 = parts[1] || ""

  function parseBlock(section) {
    const samples = []
    const chunkRe =
      /((?:Input:\s*[^\n]+\s*)+)Expected Output:\s*([^\n]+)/gi
    for (const m of section.matchAll(chunkRe)) {
      const inLines = m[1]
        .split(/\n/)
        .map((l) => l.replace(/^Input:\s*/i, "").trim())
        .filter(Boolean)
      samples.push({
        input: inLines.join("\n"),
        output: m[2].trim(),
      })
    }
    return samples
  }

  return [...parseBlock(p1), ...parseBlock(p2)]
}

/** PS5 — curated from PDF (Golden Crown + Breaker of Chains). */
function samplesTame() {
  return [
    {
      name: "golden-crown-1",
      input: `Who is the ruler of Southeros?
Allies of Ruler?
Input Messages to kingdoms from King Shan:
Input: Air, oaaawaala
Input: Land, a1d22n333a4444p
Input: Ice, zmzmzmzaztzozh
Who is the ruler of Southeros?
Allies of Ruler?`,
      output: `None
None
King Shan
Air, Land, Ice`,
    },
    {
      name: "golden-crown-2",
      input: `Who is the ruler of Southeros?
Allies of King Shan?
Input Messages to kingdoms from King Shan:
Input: Air, Let's swing the sword together
Input: Land, Die or play the tame of thrones
Input: Ice, Ahoy! Fight for me with men and money
Input: Water, Summer is coming
Input: Fire, Drag on Martin!
Who is the ruler of Southeros?
Allies of King Shan?`,
      output: `None
None
King Shan
Air, Land, Ice, Fire`,
    },
    {
      name: "breaker-of-chains-1",
      input: `Who is the ruler of Southeros?
Allies of Ruler?
Enter the kingdoms competing to be the ruler:
Input: Ice Space Air
Results after round one ballot count`,
      output: `None
None
Allies for Ice : 2
Allies for Space: 1
Allies for Air: 0
Ice
Land Fire`,
    },
    {
      name: "breaker-of-chains-2",
      input: `Who is the ruler of Southeros?
Allies of Ruler?
Enter the kingdoms competing to be the ruler:
Input: Land Air
Results after round one ballot count
Results after round two ballot count
Who is the ruler of Southeros?
Allies of Ruler?`,
      output: `None
None
Allies for Land : 1
Allies for Air: 1
Allies for Land : 1
Allies for Air: 2
Air
Fire Space`,
    },
    {
      name: "breaker-of-chains-3",
      input: `Who is the ruler of Southeros?
Allies of Ruler?
Enter the kingdoms competing to be the ruler:
Input: Fire Space
Results after round one ballot count
Results after round two ballot count
Who is the ruler of Southeros?
Allies of Ruler?`,
      output: `None
None
Allies for Fire : 0
Allies for Space: 0
Allies for Fire : 1
Allies for Space: 2
Space
Land Ice`,
    },
  ]
}

function slugDir(slug) {
  return join(ROOT, slug)
}

async function writePairs(slug, pairs) {
  const base = slugDir(slug)
  const si = join(base, "sample_input")
  const so = join(base, "sample_output")
  await mkdir(si, { recursive: true })
  await mkdir(so, { recursive: true })
  for (let i = 0; i < pairs.length; i++) {
    const p = pairs[i]
    const n = i + 1
    const inPath = p.name ? join(si, `${p.name}-input.txt`) : join(si, `input${n}.txt`)
    const outPath = p.name ? join(so, `${p.name}-expected.txt`) : join(so, `expected${n}.txt`)
    await writeFile(inPath, ensureOut(p.input), "utf8")
    await writeFile(outPath, ensureOut(p.output), "utf8")
  }
  console.log(slug, "wrote", pairs.length, "sample pair(s)")
}

async function loadPdfText(ps) {
  const buf = await readFile(join(PDF_DIR, `${ps}.pdf`))
  const data = await pdfParse(buf)
  return data.text || ""
}

async function main() {
  const dump = process.argv.includes("--dump")
  if (dump) await mkdir(DUMP_DIR, { recursive: true })

  const psToText = new Map()
  for (const ps of [...new Set(Object.values(STUB_SLUG_TO_PROBLEM_SET))]) {
    const text = await loadPdfText(ps)
    psToText.set(ps, text)
    if (dump) {
      await writeFile(join(DUMP_DIR, `${ps}.txt`), text, "utf8")
      console.log("Dumped", join("data/geektrust/extracted-text", `${ps}.txt`))
    }
  }

  const pairsBySlug = {
    family: samplesFamily(),
    war: samplesWar(psToText.get("PS2")),
    traffic: samplesTraffic(psToText.get("PS3")),
    "tame-of-thrones": samplesTame(),
  }

  if (pairsBySlug.war.length === 0) {
    console.warn("war: regex found no pairs; using PDF fallbacks")
    pairsBySlug.war = [
      {
        input: "Falicornia attacks with 100 H, 101 E, 20 AT, 5 SG",
        output: "Lengaburu deploys 52 H, 50 E, 10 AT, 3 SG and wins",
      },
      {
        input: "Falicornia attacks with 150 H, 96 E, 26 AT, 8 SG",
        output: "Lengaburu deploys 75 H, 50 E, 10 AT, 5 SG and wins",
      },
      {
        input: "Falicornia attacks with 250 H, 50 E, 20 AT, 15 SG",
        output: "Lengaburu deploys 100 H, 38 E, 10 AT, 5 SG and loses",
      },
    ]
  }

  if (pairsBySlug.traffic.length === 0) {
    console.warn("traffic: parser found no pairs; using PDF fallbacks")
    pairsBySlug.traffic = [
      {
        input: `Weather is Sunny\nOrbit1 traffic speed is 12 megamiles/hour\nOrbit2 traffic speed is 10 megamiles/hour`,
        output: "Vehicle TukTuk on Orbit1",
      },
      {
        input: `Weather is Windy\nOrbit1 traffic speed is 14 megamiles/hour\nOrbit2 traffic speed is 20 megamiles/hour`,
        output: "Vehicle Car on Orbit2",
      },
      {
        input: `Weather is Sunny\nOrbit1 max traffic speed is 20 megamiles/hour\nOrbit2 max traffic speed is 12 megamiles/hour\nOrbit3 max traffic speed is 15 megamiles/hour\nOrbit4 max traffic speed is 12 megamiles/hour`,
        output: "Vehicle TukTuk to Hallitharam via Orbit1 and RK Puram via Orbit4",
      },
      {
        input: `Weather is Windy\nOrbit1 max traffic speed is 5 megamiles/hour\nOrbit2 max traffic speed is 10 megamiles/hour\nOrbit3 max traffic speed is 20 megamiles/hour\nOrbit4 max traffic speed is 20 megamiles/hour`,
        output: "Vehicle Car to RK Puram via Orbit3 and Hallitharam via Orbit4",
      },
    ]
  }

  for (const slug of Object.keys(STUB_SLUG_TO_PROBLEM_SET)) {
    const pairs = pairsBySlug[slug]
    if (!pairs?.length) {
      console.warn("No samples for", slug)
      continue
    }
    await writePairs(slug, pairs)
    if (slug === "tame-of-thrones") {
      const si = join(slugDir(slug), "sample_input")
      const so = join(slugDir(slug), "sample_output")
      await copyFile(join(si, "golden-crown-1-input.txt"), join(si, "input1.txt"))
      await copyFile(join(so, "golden-crown-1-expected.txt"), join(so, "expected1.txt"))
      console.log("tame-of-thrones: also wrote input1.txt / expected1.txt (alias of golden-crown-1)")
    }
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
