const { expect } = require("chai");
const TicketHandler = require("../core/ticket_handler");

describe("TicketHandler", function() {
    it("should register a new card and store balance", function() {
        TicketHandler.handleBalance("MC1", 100);
        expect(TicketHandler.METROCARDS["MC1"].getBalance()).to.equal(100);
    });

    it("should add to existing card’s balance", function() {
        TicketHandler.handleBalance("MC1", 100);
        TicketHandler.handleBalance("MC1", 50);
        expect(TicketHandler.METROCARDS["MC1"].getBalance()).to.equal(250);
    });
});