const fs = require("fs");
const readline = require("readline");
const filename = process.argv[2];
const command_parser = require("./commands/command_parser");
const errors = require("./errors");

if (!filename) {
    console.error(errors.NO_INPUT);
    process.exit(1);
}

// Check if file exists before proceeding
if (!fs.existsSync(filename)) {
    console.error(`${errors.FILE_DNE} "${filename}"`);
    process.exit(1);
}

try {
    const lineReader = readline.createInterface({
        input: fs.createReadStream(filename),
        crlfDelay: Infinity, // good for cross-platform compatibility
    });

    lineReader.on("line", (line) => {
        command_parser.parseCommand(line);
    });

    lineReader.on("error", (err) => {
        console.error(errors.READFILE_ERROR, err.message);
    });

    lineReader.on("close", () => {
        // Optional: something like console.log("Processing complete.");
    });
} catch (e) {
    console.error(`${errors.READFILE_ERROR} "${e}"`);
    process.exit(1);
}