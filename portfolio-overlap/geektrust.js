const fs = require("fs");

const filename = process.argv[2];
if (!filename) {
  console.error("Usage: node geektrust.js <input-file>");
  process.exit(1);
}

const input = fs.readFileSync(filename, "utf8");
// TODO: implement per ../data/geektrust/problems/portfolio-overlap.json
void input;
