# Problem definitions (catalog)

Short definitions for everything tracked in this repo. **Full** statements, samples, and I/O details are on [Geektrust](https://www.geektrust.com/) and in each folder’s `README.md`.

| Problem | Code | Set | Folder | Status in this repo |
|---------|------|-----|--------|---------------------|
| [Metro Card](#metro-card) | `BD-PS20-1` | 20 | [`../metro-card/`](../metro-card/) | Solution + tests |
| [Power of G-Man](#power-of-g-man) | `BD-PS16-1` | 16 | [`../power-of-g-man/`](../power-of-g-man/) | Scaffold |
| [Geekdemy](#geekdemy) | `BD-PS17-1` | 17 | [`../geekdemy-node/`](../geekdemy-node/) | Scaffold |
| [Tame of Thrones](#tame-of-thrones) | `BD-PS5-1` | 5 | [`../tame-of-thrones/`](../tame-of-thrones/) | Spec + resources |

---

## Metro Card

**Official:** [detailed/metro-card](https://www.geektrust.com/candidates/coding/detailed/metro-card)

**Definition:** Model a non-stop metro between **Central** and **Airport** (both directions). Passengers pay with a **MetroCard** (unique id, balance). Fares depend on **passenger type** (Adult / Senior Citizen / Kid) and whether a trip is the **return** half of a round trip (50% discount on the return leg). If balance is insufficient, **recharge** only what is needed; the **origin station** collects a **2% service fee** on that recharge. Commands: `BALANCE`, `CHECK_IN`, `PRINT_SUMMARY`. Output **per station**: total collection, total discount, and passenger-type counts (ordered as per spec).

---

## Power of G-Man

**Official:** [detailed/power-of-g-man](https://www.geektrust.com/candidates/coding/detailed/power-of-g-man)

**Definition:** On a **6×6** grid, move from a **source** (x, y, facing N/E/S/W) to **destination** (x, y) minimizing **power** spent. Start with **200** power. Each **90° turn** costs **5**; each **1-cell move** costs **10**. Only the destination **cell** matters, not final facing. Print remaining power as `POWER <n>`.

---

## Geekdemy

**Official:** [detailed/geekdemy](https://www.geektrust.com/candidates/coding/detailed/geekdemy)

**Definition:** Build a CLI that reads commands from a file and **generates the bill** for purchases from **Geekdemy** (pricing, coupons, membership rules, etc. — follow the live problem statement for exact commands and output).

---

## Tame of Thrones

**Official:** [detailed/tame-of-thrones](https://www.geektrust.com/candidates/coding/detailed/tame-of-thrones) · [Set 5 PDF](https://www.geektrust.com/api/pdf/open/PS5)

**Definition (two parts):**

1. **A Golden Crown** — King **Shan** (Space) needs **3 more** kingdoms. Each kingdom has an **animal emblem**; a **secret message** wins that kingdom if it contains the right **letters** (e.g. Land / Panda needs `p`,`n`,`d` and `a` ×2). Output ruler and allies.

2. **Breaker of Chains** — Competing kingdoms run a **ballot**: random messages, **allegiance** rules (emblem letters, competitors don’t yield allegiance, no double allegiance), **tie-break** rounds. Messages are drawn from a fixed pool (see gist in folder README; local copy: `../tame-of-thrones/resources/boc-messages.txt`).

---

## Portfolio & trophies

Submission outcomes and badge summary: **[../PORTFOLIO.md](../PORTFOLIO.md)** · Repo overview: **[../README.md](../README.md)**
