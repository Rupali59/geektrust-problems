# Data from Geektrust

Committed snapshots for **portfolio** and **all coding challenges** exposed in the candidate app bundle (see table).

| File | Role |
|------|------|
| [`sync-meta.json`](sync-meta.json) | Last update time, bundle URL, counts (catalog size vs full embedded statements) |
| [`catalog.json`](catalog.json) | All `{ slug, problemId }` pairs (**24** challenges at last export) |
| [`problems-index.json`](problems-index.json) | Each slug with `detailedUrl` and `hasEmbeddedPayload` |
| [`problems/*.json`](problems/) | **One file per challenge** — full embedded payload when present, else a small stub + `detailedUrl` |
| [`share-summary.json`](share-summary.json) | Open Graph text from a **public** badge share URL |
| [`portfolio-badges.json`](portfolio-badges.json) | Badges, score, and dates from the logged-in **Code Portfolio** report |

The bundle is the same source as the [coding challenges](https://www.geektrust.com/candidates/coding/challenges) UI. Maintainer source: `scripts/sync-geektrust-data.mjs`.

**Note:** Numeric scores are only on your Geektrust dashboard / report, not on the public share page.
