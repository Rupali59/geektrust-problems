# Geektrust portfolio — [Rupali59](https://github.com/Rupali59)

## Data from Geektrust (automated)

| Asset | Path |
|--------|------|
| **When it was synced** | [`data/geektrust/sync-meta.json`](data/geektrust/sync-meta.json) |
| **Problem statements (JSON)** | [`data/geektrust/problems/`](data/geektrust/problems/) |
| **All challenge slugs + ids** | [`data/geektrust/catalog.json`](data/geektrust/catalog.json) |
| **Public share / membership blurb (OG)** | [`data/geektrust/share-summary.json`](data/geektrust/share-summary.json) |

Refresh everything (and optionally your badge share id):

```bash
npm run sync:geektrust
# optional:
GEEKTRUST_SHARE_BADGE_ID=your_public_share_id npm run sync:geektrust
```

The **share summary** is scraped from Geektrust’s public [`/api/share/badges/<id>`](https://www.geektrust.com/api/share/badges/1644409049) page (Open Graph tags). Example `ogDescription` at last sync:

> *I took up Metro Card challenge on @geektrust.com and earned 5 badges, and was awarded the GOLD membership…*

Exact text updates when you re-run sync with your share id.

**Numeric code-quality scores** (e.g. 95.8) are **not** exposed on that public page; for those, use your logged-in Geektrust dashboard.

---

## Links

| | |
|--|--|
| This repo | [github.com/Rupali59/geektrust-problems](https://github.com/Rupali59/geektrust-problems) |
| Geektrust | [geektrust.com](https://www.geektrust.com/) |
| Code portfolio | [candidates/coding/code-portfolio](https://www.geektrust.com/candidates/coding/code-portfolio) |
| Problem index | [problems/README.md](problems/README.md) |

---

## GitHub profile README (optional)

You can quote the same `ogDescription` from `share-summary.json` or point to this repo.
