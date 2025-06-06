function parseCommand(line) {
    const parts = line.trim().split(" ");

    const command = parts[0];
    const args = parts.slice(1);

    switch (command) {
        case "BALANCE":
            console.log("Adding user:", args.join(" "));
            break;

        case "CHECK_IN":
            console.log("Removing user:", args[0]);
            break;

        case "PRINT_SUMMARY":
            console.error("❌ Unknown command:", command);
    }
}

module.exports = { parseCommand };