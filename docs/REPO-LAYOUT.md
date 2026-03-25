# Repository layout

## Top level

| Path | Role |
|------|------|
| [`README.md`](../README.md) | Landing page: showcase, challenge table, links |
| [`scripts/sync-geektrust-data.mjs`](../scripts/sync-geektrust-data.mjs) | Refetch problem JSON from Geektrust’s app bundle (optional) |
| [`scripts/scaffold-geektrust-challenges.mjs`](../scripts/scaffold-geektrust-challenges.mjs) | Generate per-slug CLI / UI / stub folders from `data/geektrust/problems/*.json` |
| [`data/geektrust/`](../data/geektrust/) | Full **24-challenge** export (`problems/*.json`, `problems-index.json`, `catalog.json`) + portfolio badge snapshot |
| [`PORTFOLIO.md`](../PORTFOLIO.md) | Badges, score, data file index |
| [`problems/README.md`](../problems/README.md) | Index of repo problems → `data/geektrust/problems/*.json` |
| `metro-card/`, `power-of-g-man/`, `geekdemy-node/`, … | Solutions and/or scaffolds: one top-level folder per challenge slug (see [`problems/README.md`](../problems/README.md)) |
| `tame-of-thrones/` | Spec + resources + minimal Node stub (`--with-tame`) |

## Challenge folders (Geektrust layout)

Each Node challenge follows Geektrust’s usual layout: `geektrust.js`, `package.json`, `sample_input/`, and `run.sh` / `run.bat`. **How to run and input/command formats** are documented only in each folder’s **README** (Geektrust guidelines).

**`metro-card/`** adds `commands/`, `core/`, and `test/` around that template.

## Tame of Thrones

Full write-up in `README.md`, `resources/boc-messages.txt`, and optional minimal Node files from `node scripts/scaffold-geektrust-challenges.mjs --with-tame`.
