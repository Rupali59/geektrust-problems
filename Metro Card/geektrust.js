const fs = require("fs");
const reader = require("readline");
const filename = process.argv[2];
const command_parser = require("./command_parser");

if (!filename) {
    console.error("❌ Error: No input file specified.");
    process.exit(1);
}

// Check if file exists before proceeding
if (!fs.existsSync(filename)) {
    console.error(`❌ Error: File "${filename}" does not exist.`);
    process.exit(1);
}

try {
    lineReader = reader.createInterface({
        input: fs.createReadStream(filename),
    });

        lineReader.on("line", function(line) {
            console.log("Parsing:", line);
            command_parser.parseCommand(line)
        });

    lineReader.on("close", function() {
        console.log("all done, son");
    });
} catch (e) {
    console.error(`❌ Error: File reading encountered error: "${e}"`);
    process.exit(1);
}