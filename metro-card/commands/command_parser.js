const errors = require("../errors");
const TicketHandler = require("../core/ticket_handler");

class CommandParser {
    constructor() {
        this.handlers = {
            BALANCE: this.handleBalance.bind(this),
            CHECK_IN: this.handleCheckIn.bind(this),
            PRINT_SUMMARY: this.handlePrintSummary.bind(this),
        };
    }

    parseCommand(line) {
        const parts = line.trim().split(" ");
        if (parts.length === 0 || !parts[0]) {
            throw new Error(errors.INCORRECT_PARAMS);
        }

        const command = parts[0];
        const args = parts.slice(1);

        const handler = this.handlers[command];
        if (!handler) {
            throw new Error(`Unknown command: ${command}`);
        }

        handler(args);
    }

    handleBalance(args) {
        if (args.length !== 2) {
            throw new Error(errors.INCORRECT_PARAMS);
        }
        const [metroCardNumber, balanceStr] = args;
        const balance = parseInt(balanceStr, 10);
        if (isNaN(balance)) {
            throw new Error(errors.INCORRECT_PARAMS);
        }
        TicketHandler.handleBalance(metroCardNumber, balance);
    }

    handleCheckIn(args) {
        if (args.length !== 3) {
            throw new Error(errors.INCORRECT_PARAMS);
        }
        const [metroCardNumber, passengerType, fromStation] = args;
        TicketHandler.handleJourney(metroCardNumber, passengerType, fromStation);
    }

    handlePrintSummary() {
        TicketHandler.printSummary();
    }
}

module.exports = new CommandParser();