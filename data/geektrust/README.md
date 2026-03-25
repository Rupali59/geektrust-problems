# Data synced from Geektrust

Files here are **generated** from live Geektrust web assets (not hand-written).

| File | Source |
|------|--------|
| [`sync-meta.json`](sync-meta.json) | Timestamp, challenges page URL, `main.*.js` bundle URL used for the run |
| [`catalog.json`](catalog.json) | All `{ slug, problemId }` pairs extracted from that bundle (24 coding problems at last sync) |
| [`problems/*.json`](problems/) | Full problem payloads for this repo’s slugs (metro-card, power-of-g-man, geekdemy, tame-of-thrones) where the bundle embeds them |
| [`share-summary.json`](share-summary.json) | **Optional.** Open Graph tags from a **public** badge share URL (`/api/share/badges/<id>`) — membership / badge blurb |
| [`portfolio-badges.json`](portfolio-badges.json) | **Manual refresh.** Badge names, tiers, score, and dates copied from the logged-in [code portfolio](https://www.geektrust.com/candidates/coding/code-portfolio) report (not produced by `sync:geektrust`) |

## Refresh

From the repo root:

```bash
npm run sync:geektrust
```

To also refresh `share-summary.json` (replace with your own public share id from Geektrust):

```bash
GEEKTRUST_SHARE_BADGE_ID=1644409049 npm run sync:geektrust
```

**Note:** Numeric evaluation scores (e.g. code quality %) are **not** in these public endpoints; those stay in your Geektrust dashboard after login.
