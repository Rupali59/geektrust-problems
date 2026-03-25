# Data from Geektrust

Committed snapshots for **portfolio** and **all coding challenges** exposed in the candidate app bundle (see table).

| File | Role |
|------|------|
| [`sync-meta.json`](sync-meta.json) | Last update time, bundle URL, counts (catalog size vs full embedded statements) |
| [`catalog.json`](catalog.json) | All `{ slug, problemId }` pairs (**24** challenges at last export) |
| [`problems-index.json`](problems-index.json) | Each slug with `detailedUrl`, `hasEmbeddedPayload`, and `hasProblemSetPdf` (stubs) |
| [`problems/*.json`](problems/) | **One file per challenge** — full embedded payload when present, else stub + `detailedUrl` + **Problem Set PDF** refs (`pdfUrl`, `localPdf`, `problemSetPdf`) |
| [`pdfs/*.pdf`](pdfs/) | Official **PS1 / PS2 / PS3 / PS5** PDFs (full spec for bundle stubs: family, war, traffic, tame-of-thrones) |
| [`share-summary.json`](share-summary.json) | Open Graph text from a **public** badge share URL |
| [`portfolio-badges.json`](portfolio-badges.json) | Badges, score, and dates from the logged-in **Code Portfolio** report |

The bundle is the same source as the [coding challenges](https://www.geektrust.com/candidates/coding/challenges) UI.

**Maintainer scripts**

| Script | Purpose |
|--------|---------|
| [`scripts/sync-geektrust-data.mjs`](../../scripts/sync-geektrust-data.mjs) | Refetch bundle + PDFs |
| [`scripts/extract-pdf-samples.mjs`](../../scripts/extract-pdf-samples.mjs) | After `cd scripts && npm install`, parse PS1/PS2/PS3/PS5 PDFs and write `sample_input/` + `sample_output/` under `family/`, `war/`, `traffic/`, `tame-of-thrones/` |

`extract-pdf-samples.mjs` uses `pdf-parse` from [`scripts/package.json`](../../scripts/package.json). Optional: `node extract-pdf-samples.mjs --dump` writes plain-text extractions to `data/geektrust/extracted-text/` (gitignored).

**Note:** Numeric scores are only on your Geektrust dashboard / report, not on the public share page.
