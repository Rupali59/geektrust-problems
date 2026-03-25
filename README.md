# Geektrust challenge work

[![Node.js](https://img.shields.io/badge/node.js-12%2B-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Geektrust](https://img.shields.io/badge/Geektrust-coding%20challenges-000000?style=flat)](https://www.geektrust.com/)

Public repo: **practice and submissions-style solutions** for [Geektrust](https://www.geektrust.com/) coding challenges—backend problems where **clean structure, tests, and readability** matter as much as correct output.

If you are new to Geektrust: it is a hiring / upskilling platform for developers; challenges are evaluated on dimensions like **build**, **correctness**, **tests**, **readability**, and **maintainability** (see [help](https://help.geektrust.com)).

---

## Take the challenges (official)

- [Geektrust home](https://www.geektrust.com/)
- [Code portfolio](https://www.geektrust.com/candidates/coding/code-portfolio) — **while signed in**, connect GitHub (or other) repos so they sit next to your challenge work on your Geektrust profile for hiring partners.
- [Help & what evaluators look for](https://help.geektrust.com)
- [NodeJS starter artefacts (official)](https://github.com/geektrust/coding-problem-artefacts/tree/master/NodeJS)

Each problem’s **full statement** and I/O live on Geektrust; this repo adds runnable code, tests where present, and local notes.

---

## What’s in this repo

| Folder | Set | Code | Type | Challenge |
|--------|-----|------|------|-----------|
| [`metro-card/`](metro-card/) | 20 | `BD-PS20-1` | BACKEND | [Metro Card](https://www.geektrust.com/candidates/coding/detailed/metro-card) — fares, discounts, station summaries |
| [`power-of-g-man/`](power-of-g-man/) | 16 | `BD-PS16-1` | BACKEND | [Power of G-Man](https://www.geektrust.com/candidates/coding/detailed/power-of-g-man) — grid movement, power / turns |
| [`tame-of-thrones/`](tame-of-thrones/) | 5 | `BD-PS5-1` | BACKEND | [Tame of Thrones](https://www.geektrust.com/candidates/coding/detailed/tame-of-thrones) — *A Golden Crown* + *Breaker of Chains* ([PDF](https://www.geektrust.com/api/pdf/open/PS5)) |
| [`geekdemy-node/`](geekdemy-node/) | 17 | `BD-PS17-1` | BACKEND | [Geekdemy](https://www.geektrust.com/candidates/coding/detailed/geekdemy) — billing Geekdemy purchases |

Set / code / `urlName` align with Geektrust’s public challenge catalog API.

---

## Run locally

Each folder is its **own** Node project.

```bash
cd metro-card   # or power-of-g-man, geekdemy-node, …
npm ci
npm test        # where tests exist
./run.sh        # macOS/Linux — or run.bat on Windows
```

---

## Repo conventions

- **Kebab-case** folder names (no spaces) for portability across shells and OSes.
- **One `package.json` per challenge** at the folder root.

---

## Showcase (optional)

This repo is **public on purpose**—good for recruiters, peers, or your own timeline.

1. **On Geektrust:** add this repository via **[Code portfolio](https://www.geektrust.com/candidates/coding/code-portfolio)** (login required) so it shows up with your challenge history.
2. **Here or on GitHub:** link your Geektrust profile, badges (Build, Tests, Correctness, Readability, Maintainability), or membership—only what you want public.

---

## Credits

Challenge definitions, branding, and evaluation rubrics belong to **[Geektrust](https://www.geektrust.com/)**. This repository contains independent implementation work for learning and portfolio use unless otherwise noted.
