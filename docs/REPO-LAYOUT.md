# Repository layout

## Top level

| Path | Role |
|------|------|
| [`README.md`](../README.md) | Landing page: stats, trophies, links, quick navigation |
| [`PORTFOLIO.md`](../PORTFOLIO.md) | Personal portfolio hub (submissions, badges, GitHub profile tips) |
| [`problems/README.md`](../problems/README.md) | One place to read **what each problem asks** (definitions index) |
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
