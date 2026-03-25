# Data from Geektrust

Committed snapshots for **portfolio** and **problem text** (see table). These files are not edited by hand for routine updates.

| File | Role |
|------|------|
| [`sync-meta.json`](sync-meta.json) | When the catalog/problem JSON was last updated and which app bundle URL was used |
| [`catalog.json`](catalog.json) | All `{ slug, problemId }` pairs from that bundle |
| [`problems/*.json`](problems/) | Embedded problem payloads for this repo’s slugs (where the bundle includes them) |
| [`share-summary.json`](share-summary.json) | Open Graph text from a **public** badge share URL |
| [`portfolio-badges.json`](portfolio-badges.json) | Badges, score, and dates from the logged-in **Code Portfolio** report |

**Note:** Numeric scores are only on your Geektrust dashboard / report, not on the public share page.
