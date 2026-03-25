# Repository layout

## Top level

| Path | Role |
|------|------|
| [`README.md`](../README.md) | Landing page: links, sync instructions, challenge table |
| [`package.json`](../package.json) | Root-only script: `npm run sync:geektrust` |
| [`scripts/sync-geektrust-data.mjs`](../scripts/sync-geektrust-data.mjs) | Fetches live Geektrust bundle → [`data/geektrust/`](../data/geektrust/) |
| [`data/geektrust/`](../data/geektrust/) | **Synced** catalog + problem JSON + optional share OG summary |
| [`PORTFOLIO.md`](../PORTFOLIO.md) | Where synced files are described + portfolio links |
| [`problems/README.md`](../problems/README.md) | Index of repo problems → `data/geektrust/problems/*.json` |
| `metro-card/` | **Submitted** Metro Card solution (Node) |
| `power-of-g-man/` | Power of G-Man — scaffold / work in progress |
| `geekdemy-node/` | Geekdemy — scaffold / work in progress |
| `tame-of-thrones/` | Tame of Thrones — **spec + resources** (problem 2 message list) |

## Standard shape of a Node challenge folder

Geektrust’s Node template expects:

- `geektrust.js` — entrypoint; first CLI arg = path to input file  
- `package.json` — `start` runs `node geektrust.js`  
- `sample_input/` — `input1.txt`, `input2.txt`  
- `run.sh` / `run.bat` — optional convenience runners  

This repo **extends** that where solutions exist:

- **`metro-card/`** — `commands/` (parse), `core/` (domain), `test/` (Mocha)  
- **Scaffolds** — only template files until you add modules/tests  

## Tame of Thrones (non-standard)

No `package.json` required until you add a solution. Holds:

- `README.md` — problem definitions  
- `resources/boc-messages.txt` — message pool for *Breaker of Chains*
