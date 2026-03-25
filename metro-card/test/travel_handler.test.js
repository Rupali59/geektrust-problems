const { expect } = require("chai");
const TravelHandler = require("../core/travel_handler");
const MetroCard = require("../core/metro_card");

describe("TravelHandler", function() {
    let handler, card;

    beforeEach(() => {
        handler = new TravelHandler("CENTRAL");
        card = new MetroCard();
    });

    it("should initialize with correct default values", () => {
        expect(handler.FROM_STATION).to.equal("CENTRAL");
        expect(handler.TOTAL_COLLECTION).to.equal(0);
        expect(handler.DISCOUNTED_FARE).to.equal(0);
        expect(handler.SERVICE_FEE).to.equal(0);
    });

    it("should charge full fare for first ADULT journey", () => {
        card.addBalance(500);
        handler.checkIn(card, "ADULT");
        expect(card.getBalance()).to.equal(300); // 500 - 200
        expect(card.journey_count).to.equal(1);
        expect(handler.TOTAL_COLLECTION).to.equal(200);
        expect(handler.DISCOUNTED_FARE).to.equal(0);
    });

    it("should apply 50% discount on second journey", () => {
        card.addBalance(500);
        handler.checkIn(card, "ADULT"); // full fare
        handler.checkIn(card, "ADULT"); // half fare
        expect(card.journey_count).to.equal(2);
        expect(handler.DISCOUNTED_FARE).to.equal(100); // half of 200
        expect(handler.TOTAL_COLLECTION).to.equal(200 + 100);
    });

    it("should recharge card and apply service fee if balance is insufficient", () => {
        card.addBalance(100); // Not enough for 200 fare
        handler.checkIn(card, "ADULT"); // triggers recharge
        expect(card.getBalance()).to.equal(0);
        expect(handler.SERVICE_FEE).to.be.above(0);
        expect(handler.TOTAL_COLLECTION).to.equal(200);
    });

    it("should increment correct passenger type count", () => {
        card.addBalance(500);
        handler.checkIn(card, "SENIOR_CITIZEN");
        expect(handler.counts["SENIOR_CITIZEN"]).to.equal(1);
    });

    it("sortCounts should return passenger types sorted by count", () => {
        card.addBalance(1000);
        handler.checkIn(card, "ADULT");
        handler.checkIn(card, "SENIOR_CITIZEN");
        handler.checkIn(card, "ADULT");

        const sorted = handler.sortCounts();
        expect(sorted[0][0]).to.equal("ADULT");
        expect(sorted[0][1]).to.equal(2);
        expect(sorted[1][0]).to.equal("SENIOR_CITIZEN");
        expect(sorted[1][1]).to.equal(1);
    });
});