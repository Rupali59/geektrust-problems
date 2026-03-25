#!/usr/bin/env node
/**
 * Generate per-challenge folders from data/geektrust/problems/*.json
 *
 * Usage:
 *   node scripts/scaffold-geektrust-challenges.mjs
 *   node scripts/scaffold-geektrust-challenges.mjs --slug=portfolio-overlap
 *   node scripts/scaffold-geektrust-challenges.mjs --with-tame
 *   node scripts/scaffold-geektrust-challenges.mjs --force
 *
 * Skips existing solution dirs: metro-card, power-of-g-man, geekdemy-node, tame-of-thrones
 * (--with-tame adds only Node stubs under tame-of-thrones if missing)
 *
 * Note: On case-insensitive volumes, `Geekdemy-Node` and `geekdemy-node` are the same path;
 * do not try to delete a “duplicate” capital-G folder without losing the real project.
 *
 * Idempotent: safe to re-run; overwrites generated scaffold files in target dirs (not tame README).
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PROBLEMS_DIR = path.join(ROOT, "data", "geektrust", "problems");
const INDEX_PATH = path.join(ROOT, "data", "geektrust", "problems-index.json");

const SKIP_SLUGS = new Set(["metro-card", "power-of-g-man", "geekdemy", "tame-of-thrones"]);

function parseArgs() {
  const out = { slug: null, withTame: false, force: false };
  for (const a of process.argv.slice(2)) {
    if (a === "--with-tame") out.withTame = true;
    else if (a === "--force") out.force = true;
    else if (a.startsWith("--slug=")) out.slug = a.slice("--slug=".length);
  }
  return out;
}

function wordsToString(arr) {
  if (!Array.isArray(arr)) return "";
  return arr.map((x) => (x && typeof x === "object" && "word" in x ? String(x.word) : "")).join("");
}

function normalizeText(s) {
  return String(s || "").replace(/\r\n/g, "\n").replace(/\r/g, "\n").trimEnd() + "\n";
}

function extractSampleSectionPairs(sampleInputOutput) {
  const pairs = [];
  const sections = sampleInputOutput?.sampleSections;
  if (!Array.isArray(sections)) return pairs;
  for (const sec of sections) {
    const content = sec.content;
    if (!Array.isArray(content)) continue;
    let pendingInput = null;
    for (const block of content) {
      const h = (block.sectionHeading || "").trim().toUpperCase();
      if ((h === "INPUT:" || h === "INPUT") && block.textContent) {
        pendingInput = block.textContent;
      } else if ((h === "OUTPUT:" || h === "OUTPUT") && block.textContent && pendingInput != null) {
        pairs.push({ input: pendingInput, output: block.textContent });
        pendingInput = null;
      }
    }
  }
  return pairs;
}

function extractTableRowPairs(obj) {
  const rows = [];
  function walk(o) {
    if (!o || typeof o !== "object") return;
    if (Array.isArray(o)) {
      o.forEach(walk);
      return;
    }
    if (
      o.isDataRow === true &&
      o.data &&
      Array.isArray(o.data.input) &&
      Array.isArray(o.data.output)
    ) {
      const wi = wordsToString(o.data.input);
      const wo = wordsToString(o.data.output);
      if (wi.trim() && wo.trim()) rows.push({ input: wi, output: wo });
    }
    for (const k of Object.keys(o)) walk(o[k]);
  }
  walk(obj);
  return rows;
}

function dedupePairs(pairs) {
  const seen = new Set();
  const out = [];
  for (const p of pairs) {
    const k = `${p.input}\n---\n${p.output}`;
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(p);
  }
  return out;
}

function extractSamplePairs(sampleInputOutput) {
  if (!sampleInputOutput) return [];
  let pairs = extractSampleSectionPairs(sampleInputOutput);
  if (pairs.length === 0) {
    let rows = extractTableRowPairs(sampleInputOutput);
    rows = dedupePairs(rows);
    if (rows.length > 8) {
      pairs = [
        {
          input: rows.map((r) => r.input.trim()).join("\n"),
          output: rows.map((r) => r.output.trim()).join("\n"),
        },
      ];
    } else {
      pairs = rows;
    }
  } else {
    pairs = dedupePairs(pairs);
  }
  return pairs;
}

function isBdStub(data) {
  const id = data.problemId || "";
  if (!id.startsWith("BD-")) return false;
  return !data.problemStatement && !data.sampleInputOutput;
}

function isUiOrMo(data) {
  const id = data.problemId || "";
  return id.startsWith("UI-") || id.startsWith("MO-");
}

function isBdCli(data) {
  const id = data.problemId || "";
  return id.startsWith("BD-") && !isBdStub(data);
}

function detailedUrl(slug) {
  return `https://www.geektrust.com/candidates/coding/detailed/${slug}`;
}

function titleCaseSlug(slug) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function collectLinksAndBullets(problemStatement, maxItems = 24) {
  const lines = [];
  function walk(o, depth = 0) {
    if (!o || typeof o !== "object" || lines.length >= maxItems) return;
    if (Array.isArray(o)) {
      o.forEach((x) => walk(x, depth));
      return;
    }
    if (o.hyperLink && o.hyperLinkText) {
      lines.push(`- [${o.hyperLinkText}](${o.hyperLink})`);
    }
    if (o.imageSource && typeof o.imageSource === "string") {
      lines.push(`- Image: ${o.imageSource}`);
    }
    if (Array.isArray(o.orderedList)) {
      for (const item of o.orderedList) {
        if (typeof item === "string" && item.trim()) lines.push(`- ${item.trim().slice(0, 400)}`);
        if (lines.length >= maxItems) return;
      }
    }
    if (o.statement && typeof o.statement === "string" && o.statement.trim().length > 20) {
      const t = o.statement.trim().split("\n")[0].slice(0, 280);
      if (t) lines.push(`- ${t}`);
    }
    for (const k of Object.keys(o)) walk(o[k], depth + 1);
  }
  walk(problemStatement);
  return [...new Set(lines)].slice(0, maxItems);
}

const CLI_PACKAGE_JSON = `{
  "name": "geektrust",
  "version": "1.0.0",
  "description": "geektrust-project",
  "main": "index.js",
  "scripts": {
    "start": "node geektrust.js",
    "test": "mocha"
  },
  "author": "geektrust",
  "license": "ISC",
  "dependencies": {
    "mocha": "^10.0.0"
  }
}
`;

function cliGeektrustJs(slug) {
  return `const fs = require("fs");

const filename = process.argv[2];
if (!filename) {
  console.error("Usage: node geektrust.js <input-file>");
  process.exit(1);
}

const input = fs.readFileSync(filename, "utf8");
// TODO: implement per ../data/geektrust/problems/${slug}.json
void input;
`;
}

const CLI_TEST_JS = `// Add your tests here
`;

const RUN_SH = `#!/bin/bash

npm install --silent
npm start --silent sample_input/input1.txt
`;

const RUN_BAT = `@echo off

npm install --silent
npm start --silent sample_input\\input1.txt
`;

const UI_PACKAGE_JSON = `{
  "name": "geektrust-ui-challenge",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^5.4.11"
  }
}
`;

const VITE_CONFIG = `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
`;

const INDEX_HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Geektrust challenge</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`;

const MAIN_JSX = `import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;

const APP_JSX = `export default function App() {
  return (
    <main style={{ fontFamily: "system-ui", padding: "1.5rem" }}>
      <h1>Geektrust UI challenge</h1>
      <p>
        Implement the UI per <code>README.md</code> and the JSON spec under{" "}
        <code>../data/geektrust/problems/</code>.
      </p>
    </main>
  );
}
`;

function writeIfChanged(file, content, opts = {}) {
  const { skipIfExists = false } = opts;
  if (skipIfExists && fs.existsSync(file)) return false;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const next = normalizeText(content).replace(/\n+$/, "\n");
  if (fs.existsSync(file) && fs.readFileSync(file, "utf8") === next) return false;
  fs.writeFileSync(file, next);
  return true;
}

function writeExecutable(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
  try {
    fs.chmodSync(file, 0o755);
  } catch {
    /* windows */
  }
}

function readmeHeader(title, slug, problemId) {
  return `# ${title}

**Official challenge:** [${title} on Geektrust](${detailedUrl(slug)})

**Canonical spec (Geektrust):** [\`../data/geektrust/problems/${slug}.json\`](../data/geektrust/problems/${slug}.json).

**Geektrust catalog:** Problem code **\`${problemId}\`** · slug \`${slug}\`.
`;
}

function writeCliScaffold(dir, slug, data) {
  const problemId = data.problemId || "";
  const title = titleCaseSlug(slug);
  const pairs = extractSamplePairs(data.sampleInputOutput);

  writeIfChanged(path.join(dir, "package.json"), CLI_PACKAGE_JSON);
  writeIfChanged(path.join(dir, "geektrust.js"), cliGeektrustJs(slug));
  writeIfChanged(path.join(dir, "test.js"), CLI_TEST_JS);
  writeExecutable(path.join(dir, "run.sh"), RUN_SH.trim() + "\n");
  writeExecutable(path.join(dir, "run.bat"), RUN_BAT.trim() + "\n");

  const si = path.join(dir, "sample_input");
  fs.mkdirSync(si, { recursive: true });
  if (pairs.length === 0) {
    writeIfChanged(
      path.join(si, "input1.txt"),
      "# Add sample input from Geektrust (see JSON or detailed page).\n"
    );
  } else {
    pairs.forEach((p, i) => {
      const n = i + 1;
      writeIfChanged(path.join(si, `input${n}.txt`), normalizeText(p.input));
      const outDir = path.join(dir, "sample_output");
      fs.mkdirSync(outDir, { recursive: true });
      writeIfChanged(path.join(outDir, `expected${n}.txt`), normalizeText(p.output));
    });
  }

  const body = `${readmeHeader(title, slug, problemId)}

## Run (Geektrust-style)

From this folder:

- \`./run.sh\` or \`run.bat\` (installs deps and runs \`sample_input/input1.txt\`)
- Or: \`npm ci\` then \`npm start -- sample_input/input1.txt\`

## Tests

\`npm test\`

## Problem summary

See the JSON spec for the full statement and I/O. Sample pairs were auto-extracted into \`sample_input/\` and \`sample_output/\` when available.
`;
  writeIfChanged(path.join(dir, "README.md"), body);
}

function writeUiScaffold(dir, slug, data) {
  const problemId = data.problemId || "";
  const title = titleCaseSlug(slug);
  const bullets = collectLinksAndBullets(data.problemStatement);

  writeIfChanged(path.join(dir, "package.json"), UI_PACKAGE_JSON);
  writeIfChanged(path.join(dir, "vite.config.js"), VITE_CONFIG);
  writeIfChanged(path.join(dir, "index.html"), INDEX_HTML.trim() + "\n");
  writeIfChanged(path.join(dir, "src", "main.jsx"), MAIN_JSX.trim() + "\n");
  writeIfChanged(path.join(dir, "src", "App.jsx"), APP_JSX.trim() + "\n");

  const bulletBlock = bullets.length ? `\n## Requirements (from bundle)\n\n${bullets.join("\n")}\n` : "";

  const body = `${readmeHeader(title, slug, problemId)}

## Dev server

\`npm install\` then \`npm run dev\` (Vite + React).

## Build

\`npm run build\` — output in \`dist/\`.
${bulletBlock}
## Notes

Frontend challenges often include a PDF or downloadable assets on Geektrust. Use the official detailed page and linked files for mocks and API contracts.
`;
  writeIfChanged(path.join(dir, "README.md"), body);
}

function writeStubReadme(dir, slug, data) {
  const problemId = data.problemId || "";
  const title = titleCaseSlug(slug);
  const pdfBlock =
    data.pdfUrl && data.localPdf
      ? `
- **Problem Set PDF (local):** [\`../data/geektrust/${data.localPdf}\`](../data/geektrust/${data.localPdf}) — **${data.problemSetPdf || ""}**
- **PDF on Geektrust:** [open PDF](${data.pdfUrl})
`
      : "";
  const body = `${readmeHeader(title, slug, problemId)}

## Spec in this repo

The Geektrust app bundle does **not** embed the full \`problemStatement\` / samples for this slug. This folder only holds a pointer.

- Refresh JSON + PDFs: \`node scripts/sync-geektrust-data.mjs\`
- Read the full problem on [Geektrust](${detailedUrl(slug)})
${pdfBlock}`;
  fs.mkdirSync(dir, { recursive: true });
  writeIfChanged(path.join(dir, "README.md"), body);
}

function writeTameStubs(dir) {
  const files = ["package.json", "geektrust.js", "test.js", "run.sh", "run.bat"];
  for (const f of files) {
    const p = path.join(dir, f);
    if (fs.existsSync(p)) continue;
    if (f === "package.json") writeIfChanged(p, CLI_PACKAGE_JSON);
    if (f === "geektrust.js") writeIfChanged(p, cliGeektrustJs("tame-of-thrones"));
    if (f === "test.js") writeIfChanged(p, CLI_TEST_JS);
    if (f === "run.sh") writeExecutable(p, RUN_SH.trim() + "\n");
    if (f === "run.bat") writeExecutable(p, RUN_BAT.trim() + "\n");
  }
  const si = path.join(dir, "sample_input");
  fs.mkdirSync(si, { recursive: true });
  const input1 = path.join(si, "input1.txt");
  if (!fs.existsSync(input1)) {
    writeIfChanged(input1, "# Add input per Set 5 PDF / Geektrust.\n");
  }
}

function main() {
  const { slug: onlySlug, withTame, force } = parseArgs();
  if (force) {
    /* reserved for future selective overwrite of skipped dirs */
  }

  const index = JSON.parse(fs.readFileSync(INDEX_PATH, "utf8"));
  const entries = index.problems || [];

  if (withTame) {
    const tameDir = path.join(ROOT, "tame-of-thrones");
    writeTameStubs(tameDir);
    console.log("Updated tame-of-thrones with missing Node stubs (--with-tame).");
  }

  for (const entry of entries) {
    const slug = entry.slug;
    if (onlySlug && slug !== onlySlug) continue;
    if (SKIP_SLUGS.has(slug)) continue;

    const jsonPath = path.join(PROBLEMS_DIR, `${slug}.json`);
    if (!fs.existsSync(jsonPath)) {
      console.warn("Missing JSON:", jsonPath);
      continue;
    }

    const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    const dir = path.join(ROOT, slug);

    if (isUiOrMo(data)) {
      writeUiScaffold(dir, slug, data);
      console.log("UI scaffold:", slug);
    } else if (isBdStub(data)) {
      writeStubReadme(dir, slug, data);
      console.log("Stub README:", slug);
    } else if (isBdCli(data)) {
      writeCliScaffold(dir, slug, data);
      console.log("CLI scaffold:", slug);
    } else {
      console.warn("Unknown shape, skipped:", slug);
    }
  }
}

main();
