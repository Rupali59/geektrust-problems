# Tame of Thrones

**Official challenge:** [Tame of Thrones on Geektrust](https://www.geektrust.com/candidates/coding/detailed/tame-of-thrones)

**Bundle snapshot (Geektrust):** [`../data/geektrust/problems/tame-of-thrones.json`](../data/geektrust/problems/tame-of-thrones.json) — currently slug + id only; **full spec** is in the [Set 5 PDF](https://www.geektrust.com/api/pdf/open/PS5) and below.

**Geektrust catalog:** Problem code **`BD-PS5-1`** · slug `tame-of-thrones`.

This folder holds the **Tame of Thrones** material (**A Golden Crown** + **Breaker of Chains**). Narrative and rules below follow that PDF.

## Status

**Specification + assets** — problem definitions and a local copy of the *Breaker of Chains* message list. A **minimal Node scaffold** (`package.json`, `geektrust.js`, `run.sh`, `sample_input/`) is present for parity with other backend challenges; implementation is still TODO.

## Repository layout

```
tame-of-thrones/
├── README.md                    # This file — full problem write-up
├── package.json / geektrust.js / run.sh / test.js
├── sample_input/
├── resources/
│   └── boc-messages.txt         # Message pool for Problem 2
```

**One-line definition:** [problems/README.md](../problems/README.md#tame-of-thrones)

---

## Getting started (Geektrust expectations)

1. Getting the output right matters, but **clean, well-modelled code** matters more.
2. Build a **command-line** application (not a web app).
3. Avoid **non-essential third-party** libraries where possible.
4. Include a **README** with how to run and how to test.

---

## Problem 1: A Golden Crown

There is no ruler in the universe of **Southeros**, and pandemonium reigns. **Shan**, the gorilla king of the **Space** kingdom, wants to rule all **six** kingdoms. He needs the support of **3 more** kingdoms to become ruler.

Each kingdom has an **animal emblem**. Shan must send a **secret message** that contains the letters of that animal (as in the rules below) to win a kingdom over.

| Kingdom | Emblem   |
|---------|----------|
| LAND    | Panda    |
| WATER   | Octopus  |
| ICE     | Mammoth  |
| AIR     | Owl      |
| FIRE    | Dragon   |

**Rule:** The secret message must contain the letters of the animal in their emblem. For example, for **Land** (Panda), the message needs **p**, **n**, **d** at least once each and **a** at least **twice**. Example: `a1d22n333a4444p` wins Land.

**Goal:** Model King Shan sending messages to kingdoms. Once he wins **3 or more** additional kingdoms, he is ruler of Southeros. Output who the ruler is and which kingdoms are allies.

### Sample behaviour (conceptual)

**Initial state**

- Who is the ruler of Southeros? → **None**
- Allies of Ruler? → **None**

**After messages**

- Input: Air — `oaaawaala`; Land — `a1d22n333a4444p`; Ice — `zmzmzmzaztzozh`
- Who is the ruler of Southeros? → **King Shan**
- Allies of Ruler? → **Air, Land, Ice**

(Exact prompts and formatting follow the official I/O spec in the challenge.)

---

## Problem 2: Breaker of Chains

Other kingdoms also want to rule Southeros; war is imminent. The **High Priest** proposes a **ballot** system to choose the ruler.

### Ballot rules

1. Any kingdom can **compete** to be the ruler.
2. Competitors send a message to **all other** kingdoms asking for allegiance.
3. Messages go into a **ballot**; the High Priest picks **6 random** messages.
4. Those **6** messages are delivered to the **receiving** kingdoms.
5. The kingdom that receives the **highest number** of allegiances wins.

### Allegiance rules (receiving kingdom)

1. The receiver gives allegiance to the **sender** if the message **contains the letters of their animal emblem** (same idea as Problem 1).
2. If the **receiving** kingdom is **also competing** to be ruler, it **does not** give allegiance, even if the message is valid.
3. A kingdom **cannot** give allegiance **twice**; the first allegiance stands.

### Tie-breaking

If there is a **tie**, repeat the ballot process **only among the tied** kingdoms until there is a winner.

### Message format in the ballot

Each ballot entry should include:

- **Sender** kingdom  
- **Receiver** kingdom  
- **Message** — chosen **randomly** from the official message table in the problem (see also [this gist](https://gist.github.com/dhanush/8374c96fd6be4af08cde4852572ee396) referenced by Geektrust).

### Sample outcome (conceptual)

- Enter competing kingdoms, e.g. `Ice Space Air`.
- After round one: e.g. Allies for Ice: 2, Space: 1, Air: 0 → ruler **Ice**, allies e.g. **Land, Fire**.

(Random message selection means your run may differ; follow the official sample flows for exact expected behaviour.)

---

## Reference in this repo

- `resources/boc-messages.txt` — message list for *Breaker of Chains* (local copy of the official pool / gist).

## Help

- [Geektrust help](https://help.geektrust.com)
- [NodeJS build artefacts](https://github.com/geektrust/coding-problem-artefacts/tree/master/NodeJS)
