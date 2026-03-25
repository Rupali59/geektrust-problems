# Repository layout

## Top level

| Path | Role |
|------|------|
| [`README.md`](../README.md) | Landing page: showcase, challenge table, links |
| [`scripts/sync-geektrust-data.mjs`](../scripts/sync-geektrust-data.mjs) | Maintainer script that refetches problem JSON from Geektrust’s app bundle (optional) |
| [`data/geektrust/`](../data/geektrust/) | Catalog + problem JSON + portfolio badge snapshot |
| [`PORTFOLIO.md`](../PORTFOLIO.md) | Badges, score, data file index |
| [`problems/README.md`](../problems/README.md) | Index of repo problems → `data/geektrust/problems/*.json` |
| `metro-card/` | Metro Card solution (Node) |
| `power-of-g-man/` | Power of G-Man — scaffold |
| `geekdemy-node/` | Geekdemy — scaffold |
| `tame-of-thrones/` | Spec + resources |

## Challenge folders (Geektrust layout)

Each Node challenge follows Geektrust’s usual layout: `geektrust.js`, `package.json`, `sample_input/`, and `run.sh` / `run.bat`. **How to run and input/command formats** are documented only in each folder’s **README** (Geektrust guidelines).

**`metro-card/`** adds `commands/`, `core/`, and `test/` around that template.

## Tame of Thrones

No Node app until you add one. Contains `README.md` (problem text) and `resources/boc-messages.txt`.
