const fs = require("fs");

const filename = process.argv[2];

fs.readFile(filename, "utf8", (err, data) => {});