# Geektrust submissions & portfolio — [Rupali59](https://github.com/Rupali59)

[![Node.js](https://img.shields.io/badge/node.js-12%2B-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Geektrust GOLD](https://img.shields.io/badge/Geektrust-GOLD%20membership-ffd700?style=flat)](https://www.geektrust.com/)
[![Metro Card](https://img.shields.io/badge/Metro%20Card-5%20badges-22c55e?style=flat)](PORTFOLIO.md)

Public **Geektrust** work with **problem data pulled from their live site** into [`data/geektrust/`](data/geektrust/) (see [`sync-meta.json`](data/geektrust/sync-meta.json) for last run).  
Membership / badge line above matches the **Open Graph** text from Geektrust’s public [badge share](https://www.geektrust.com/api/share/badges/1644409049) page — refresh via `npm run sync:geektrust` (see below).

| | |
|---:|---|
| **Author** | [@Rupali59](https://github.com/Rupali59) |
| **This repo** | [github.com/Rupali59/geektrust-problems](https://github.com/Rupali59/geektrust-problems) |
| **Code portfolio (link this repo)** | [candidates/coding/code-portfolio](https://www.geektrust.com/candidates/coding/code-portfolio) |

---

## Sync from Geektrust

```bash
npm run sync:geektrust
# optional: refresh public share blurb (use your share id from Geektrust)
GEEKTRUST_SHARE_BADGE_ID=1644409049 npm run sync:geektrust
```

Writes **`data/geektrust/`** — catalog, per-problem JSON, `sync-meta.json`, and optionally `share-summary.json`. Details: [`data/geektrust/README.md`](data/geektrust/README.md).

---

## Challenges in this repo

| Folder | `problemId` | Challenge | Status |
|--------|-------------|-----------|--------|
| [`metro-card/`](metro-card/) | `BD-PS20-1` | [Metro Card](https://www.geektrust.com/candidates/coding/detailed/metro-card) | Solution + tests |
| [`power-of-g-man/`](power-of-g-man/) | `BD-PS16-1` | [Power of G-Man](https://www.geektrust.com/candidates/coding/detailed/power-of-g-man) | WIP / scaffold |
| [`geekdemy-node/`](geekdemy-node/) | `BD-PS17-1` | [Geekdemy](https://www.geektrust.com/candidates/coding/detailed/geekdemy) | WIP / scaffold |
| [`tame-of-thrones/`](tame-of-thrones/) | `BD-PS5-1` | [Tame of Thrones](https://www.geektrust.com/candidates/coding/detailed/tame-of-thrones) + [PDF](https://www.geektrust.com/api/pdf/open/PS5) | Spec + resources |

**Definitions index (links to JSON):** [`problems/README.md`](problems/README.md) · **Portfolio notes:** [`PORTFOLIO.md`](PORTFOLIO.md) · **Repo layout:** [`docs/REPO-LAYOUT.md`](docs/REPO-LAYOUT.md)

---

## Run challenge code locally

```bash
cd metro-card   # or power-of-g-man, geekdemy-node
npm ci
npm test        # where tests exist
./run.sh        # macOS/Linux — or run.bat on Windows
```

---

## Official Geektrust links

- [Geektrust home](https://www.geektrust.com/)
- [Help & evaluation criteria](https://help.geektrust.com)
- [NodeJS starter artefacts](https://github.com/geektrust/coding-problem-artefacts/tree/master/NodeJS)

---

## Credits

Challenge definitions belong to **[Geektrust](https://www.geektrust.com/)**. JSON snapshots in `data/geektrust/` are derived from their published candidate UI bundle for reference only.
