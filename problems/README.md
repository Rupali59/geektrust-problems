# Coding challenges index (Geektrust)

Every challenge currently embedded in Geektrust’s **candidate coding challenges** app bundle has a JSON file under **[`../data/geektrust/problems/`](../data/geektrust/problems/)**.

- **Machine-readable index** (slug, `problemId`, Geektrust URL, whether the bundle includes full statement JSON): [`../data/geektrust/problems-index.json`](../data/geektrust/problems-index.json)  
- **Flat catalog** (slug + `problemId` only): [`../data/geektrust/catalog.json`](../data/geektrust/catalog.json)  
- **Last fetch metadata**: [`../data/geektrust/sync-meta.json`](../data/geektrust/sync-meta.json)

**20** problems include a full embedded `problemStatement` / samples in the bundle; **4** are **stub** files in the app bundle (`family`, `war`, `traffic`, `tame-of-thrones`) — each stub JSON points at the official **Problem Set PDF** under [`../data/geektrust/pdfs/`](../data/geektrust/pdfs/) (PS1, PS2, PS3, PS5) and at the [coding challenges](https://www.geektrust.com/candidates/coding/challenges) / per-slug detailed pages on Geektrust. Run `node scripts/sync-geektrust-data.mjs` to refetch bundle + PDFs.

**Scaffolds:** from repo root run `node scripts/scaffold-geektrust-challenges.mjs` (optional `--slug=<slug>`, `--with-tame` to add Node stubs under `tame-of-thrones/`). Skips `metro-card`, `power-of-g-man`, `geekdemy` (use `geekdemy-node/`), and `tame-of-thrones` unless `--with-tame`.

## This repo’s solution folders

| Slug | Folder |
|------|--------|
| `metro-card` | [`../metro-card/`](../metro-card/) |
| `power-of-g-man` | [`../power-of-g-man/`](../power-of-g-man/) |
| `geekdemy` | [`../geekdemy-node/`](../geekdemy-node/) |
| `tame-of-thrones` | [`../tame-of-thrones/`](../tame-of-thrones/) |

## All challenges (from bundle)

| `problemId` | Slug | JSON | Scaffold / folder | Geektrust detailed |
|-------------|------|------|-------------------|-------------------|
| BD-PS1-1 | family | [family.json](../data/geektrust/problems/family.json) | [family/](../family/) (stub README) | [family](https://www.geektrust.com/candidates/coding/detailed/family) |
| BD-PS10-1 | portfolio-overlap | [portfolio-overlap.json](../data/geektrust/problems/portfolio-overlap.json) | [portfolio-overlap/](../portfolio-overlap/) | [link](https://www.geektrust.com/candidates/coding/detailed/portfolio-overlap) |
| BD-PS11-1 | water-management | [water-management.json](../data/geektrust/problems/water-management.json) | [water-management/](../water-management/) | [link](https://www.geektrust.com/candidates/coding/detailed/water-management) |
| BD-PS12-1 | expenses-management | [expenses-management.json](../data/geektrust/problems/expenses-management.json) | [expenses-management/](../expenses-management/) | [link](https://www.geektrust.com/candidates/coding/detailed/expenses-management) |
| BD-PS13-1 | racetrack-management | [racetrack-management.json](../data/geektrust/problems/racetrack-management.json) | [racetrack-management/](../racetrack-management/) | [link](https://www.geektrust.com/candidates/coding/detailed/racetrack-management) |
| BD-PS14-1 | doremi-subscription | [doremi-subscription.json](../data/geektrust/problems/doremi-subscription.json) | [doremi-subscription/](../doremi-subscription/) | [link](https://www.geektrust.com/candidates/coding/detailed/doremi-subscription) |
| BD-PS15-1 | course-scheduling | [course-scheduling.json](../data/geektrust/problems/course-scheduling.json) | [course-scheduling/](../course-scheduling/) | [link](https://www.geektrust.com/candidates/coding/detailed/course-scheduling) |
| BD-PS16-1 | power-of-g-man | [power-of-g-man.json](../data/geektrust/problems/power-of-g-man.json) | [power-of-g-man/](../power-of-g-man/) | [link](https://www.geektrust.com/candidates/coding/detailed/power-of-g-man) |
| BD-PS17-1 | geekdemy | [geekdemy.json](../data/geektrust/problems/geekdemy.json) | [geekdemy-node/](../geekdemy-node/) | [link](https://www.geektrust.com/candidates/coding/detailed/geekdemy) |
| BD-PS18-1 | stationery-shop | [stationery-shop.json](../data/geektrust/problems/stationery-shop.json) | [stationery-shop/](../stationery-shop/) | [link](https://www.geektrust.com/candidates/coding/detailed/stationery-shop) |
| BD-PS19-1 | toll-calculator | [toll-calculator.json](../data/geektrust/problems/toll-calculator.json) | [toll-calculator/](../toll-calculator/) | [link](https://www.geektrust.com/candidates/coding/detailed/toll-calculator) |
| BD-PS2-1 | war | [war.json](../data/geektrust/problems/war.json) | [war/](../war/) (stub README) | [link](https://www.geektrust.com/candidates/coding/detailed/war) |
| BD-PS20-1 | metro-card | [metro-card.json](../data/geektrust/problems/metro-card.json) | [metro-card/](../metro-card/) | [link](https://www.geektrust.com/candidates/coding/detailed/metro-card) |
| BD-PS21-1 | ride-sharing | [ride-sharing.json](../data/geektrust/problems/ride-sharing.json) | [ride-sharing/](../ride-sharing/) | [link](https://www.geektrust.com/candidates/coding/detailed/ride-sharing) |
| BD-PS3-1 | traffic | [traffic.json](../data/geektrust/problems/traffic.json) | [traffic/](../traffic/) (stub README) | [link](https://www.geektrust.com/candidates/coding/detailed/traffic) |
| BD-PS5-1 | tame-of-thrones | [tame-of-thrones.json](../data/geektrust/problems/tame-of-thrones.json) | [tame-of-thrones/](../tame-of-thrones/) | [link](https://www.geektrust.com/candidates/coding/detailed/tame-of-thrones) |
| BD-PS6-1 | the-ledger-co | [the-ledger-co.json](../data/geektrust/problems/the-ledger-co.json) | [the-ledger-co/](../the-ledger-co/) | [link](https://www.geektrust.com/candidates/coding/detailed/the-ledger-co) |
| BD-PS7-1 | my-money | [my-money.json](../data/geektrust/problems/my-money.json) | [my-money/](../my-money/) | [link](https://www.geektrust.com/candidates/coding/detailed/my-money) |
| BD-PS8-1 | train | [train.json](../data/geektrust/problems/train.json) | [train/](../train/) | [link](https://www.geektrust.com/candidates/coding/detailed/train) |
| BD-PS9-1 | make-space | [make-space.json](../data/geektrust/problems/make-space.json) | [make-space/](../make-space/) | [link](https://www.geektrust.com/candidates/coding/detailed/make-space) |
| MO-PS1-1 | finding-falcone | [finding-falcone.json](../data/geektrust/problems/finding-falcone.json) | [finding-falcone/](../finding-falcone/) (Vite + React) | [link](https://www.geektrust.com/candidates/coding/detailed/finding-falcone) |
| UI-PS1-1 | space | [space.json](../data/geektrust/problems/space.json) | [space/](../space/) (Vite + React) | [link](https://www.geektrust.com/candidates/coding/detailed/space) |
| UI-PS2-1 | admin-ui | [admin-ui.json](../data/geektrust/problems/admin-ui.json) | [admin-ui/](../admin-ui/) (Vite + React) | [link](https://www.geektrust.com/candidates/coding/detailed/admin-ui) |
| UI-PS3-1 | teerex-store | [teerex-store.json](../data/geektrust/problems/teerex-store.json) | [teerex-store/](../teerex-store/) (Vite + React) | [link](https://www.geektrust.com/candidates/coding/detailed/teerex-store) |

Challenge definitions © [Geektrust](https://www.geektrust.com/).
