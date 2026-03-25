# Geektrust submissions & portfolio — [Rupali59](https://github.com/Rupali59)

## Showcase

Evaluated submission on **[Geektrust](https://www.geektrust.com/)** — this repo holds the code; numbers below match the **[Code Portfolio → Metro Card → View report](https://www.geektrust.com/candidates/coding/code-portfolio)** screen.

| | |
|---:|---|
| **Challenge** | [**Metro Card**](https://www.geektrust.com/candidates/coding/detailed/metro-card) (`BD-PS20-1`) — backend |
| **Geektrust score** | **95.8** / 100 |
| **Membership** | **GOLD** (from [public share blurb](https://www.geektrust.com/api/share/badges/1644409049) · also in [`share-summary.json`](data/geektrust/share-summary.json)) |
| **Stack** | **Node.js 16.10.0** · **npm** |
| **Submitted** | **2025-06-09** |
| **Badges earned** | **5** — listed by tier below |

**Badges**

| Tier | Earned |
|------|--------|
| Basic | **Build** |
| Intermediate | **Tests** · **Correctness** |
| Advanced | **Readability** · **Maintainability** |

Structured copy (JSON): **[`data/geektrust/portfolio-badges.json`](data/geektrust/portfolio-badges.json)** · Narrative + links: **[`PORTFOLIO.md`](PORTFOLIO.md)**

[![Node.js](https://img.shields.io/badge/node.js-12%2B-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Geektrust GOLD](https://img.shields.io/badge/Geektrust-GOLD%20membership-ffd700?style=flat)](https://www.geektrust.com/)
[![Metro Card](https://img.shields.io/badge/Metro%20Card-95.8-22c55e?style=flat)](data/geektrust/portfolio-badges.json)
[![Badges](https://img.shields.io/badge/badges-5%20earned-blue?style=flat)](data/geektrust/portfolio-badges.json)

| | |
|---:|---|
| **Author** | [@Rupali59](https://github.com/Rupali59) |
| **This repo** | [github.com/Rupali59/geektrust-problems](https://github.com/Rupali59/geektrust-problems) |
| **Link this repo on Geektrust** | [Code portfolio](https://www.geektrust.com/candidates/coding/code-portfolio) |

**Problem specs** in [`data/geektrust/problems/`](data/geektrust/problems/) are refreshed from Geektrust’s live app bundle: `npm run sync:geektrust`. Refresh **`portfolio-badges.json`** when you earn new badges (from the report UI or by editing the JSON).

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
