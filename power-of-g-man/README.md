# Power of G-Man

**Official challenge:** [Power of G-Man on Geektrust](https://www.geektrust.com/candidates/coding/detailed/power-of-g-man)

**Canonical spec (synced from Geektrust):** [`../data/geektrust/problems/power-of-g-man.json`](../data/geektrust/problems/power-of-g-man.json) · Re-run: `npm run sync:geektrust`.

**Geektrust catalog:** Problem code **`BD-PS16-1`** · slug `power-of-g-man`.

## Status

**In progress** — Geektrust template only; core logic in `geektrust.js` not implemented yet.

## Repository layout

```
power-of-g-man/
├── geektrust.js          # Entry (implement me)
├── test.js
├── sample_input/
├── run.sh / run.bat
├── package.json
└── README.md
```

**One-line definition:** [problems/README.md](../problems/README.md#power-of-g-man)

## Problem statement

G-Man is a video game character who must move from a **source** cell to a **destination** cell on a **6 × 6** grid. There can be many paths; G-Man must reach the destination using the **least total power**.

### Position

- Position is **x**, **y** on the grid.
- **Direction** is one of **N**, **E**, **S**, **W** (compass).
- Example: `2 1 N` means x = 2, y = 1, facing North.

### Power rules

G-Man starts with **200** power. Each action costs power:

| Action | Cost |
|--------|------|
| **90° turn** (left or right, one step) | **5** per turn |
| **Move** 1 grid point forward | **10** per step |

Examples (from the problem spec):

- From `2 1 E` to `4 1`: 2 grid steps → **20** power.
- From `2 1 S` to `4 5`: 2 turns + 6 grid steps → **70** power (2×5 + 6×10).

### Goal

From the given **source** (coordinates + facing) and **destination** (coordinates), compute the **minimum power** used along any valid path (turns + moves). Print **remaining** power: `200 − power_spent`.

**Output format:** `POWER <integer>`

### Assumptions

- Grid is **6 × 6**; coordinates stay within the valid range given in the challenge (commonly **0–6**).
- Direction is always **N**, **E**, **S**, or **W**.
- Destination is reachable on the grid.
- Only **destination coordinates** matter; **final facing at the destination does not** matter.

### Input / output (typical)

Your program reads a text file path from the command line. Lines are usually shaped like:

```
SOURCE <x> <y> <DIRECTION>
DESTINATION <x> <y>
```

Example:

| Input | Output |
|-------|--------|
| `SOURCE 2 1 E`<br>`DESTINATION 4 3` | `POWER 155` |

Use `sample_input/input1.txt` and `sample_input/input2.txt` with the exact format required when you submit.

---

# Pre-requisites
* NodeJS 12.6.0/14.15.4/16.10.0
* npm

# How to run the code

We have provided scripts to execute the code. 

Use `run.sh` if you are Linux/Unix/macOS Operating systems and `run.bat` if you are on Windows.  Both the files run the commands silently and prints only output from the input file `sample_input/input1.txt`. You are supposed to add the input commands in the file from the appropriate problem statement. 

Internally both the scripts run the following commands 

 * `npm ci --silent` - This will build the solution downloading the necessary dependencies.
 * Once the `npm install` from the previous build process is complete, we will execute the program using the command

`npm start --silent sample_input/input1.txt`

We expect your program to take the location to the text file as parameter. Input needs to be read from a text file, and output should be printed to the console. The text file will contain only commands in the format prescribed by the respective problem.

This main file, main.go should receive in the command line argument and parse the file passed in. Once the file is parsed and the application processes the commands, it should only print the output.

 # Running the code for multiple test cases

 Please fill `input1.txt` and `input2.txt` with the input commands and use those files in `run.bat` or `run.sh`. Replace `./geektrust sample_input/input1.txt` with `./geektrust sample_input/input2.txt` to run the test case from the second file. 

 # How to execute the unit tests

 Mocha based test cases are executed with the following command from the root folder
`mocha test`

Jest based test cases are executed with the following command from the root folder
`jest`

# Typescript

Your main file should be named as `geektrust.ts`.

As of now we only support Typescript under the NPM build system. This will require you to compile your typescript program into javascript.

We run the commands `npm install --silent`, `npm start --silent` and `npm test --silent`.

Please ensure that the npm install commands creates the file `geektrust.js` from your geektrust.ts file. The npm start command should then execute this `geektrust.js` file.

In your `package.json` file make sure you have an entry for the install, start and test script.

* The install command should install the dependencies and also build the `geektrust.js` file.
* The start command will execute the program.
* The test command should execute all the unit tests present

```
"scripts": {
    "install" :"<command to create your geektrust.js file>",
    "start": "node geektrust.js",
    "test": "mocha"
}
```

Note: If you create the geektrust.js file in some other folder (like dist/, build/ or out/)other than the main folder, then please appropriately edit the start command.

# Help

You can refer our help documents [here](https://help.geektrust.com)
You can read build instructions [here](https://github.com/geektrust/coding-problem-artefacts/tree/master/NodeJS)
