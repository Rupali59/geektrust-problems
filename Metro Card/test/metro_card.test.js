const { expect } = require("chai");
const MetroCard = require("../core/metro_card");

describe("MetroCard", function() {
    it("should add balance correctly", function() {
        const card = new MetroCard();
        card.addBalance(100);
        expect(card.getBalance()).to.equal(100);
    });

    it("should deduct balance", function() {
        const card = new MetroCard();
        card.addBalance(200);
        card.deductBalance(50);
        expect(card.getBalance()).to.equal(150);
    });
});