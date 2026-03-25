class MetroCard {
    constructor(METROCARD_NUMBER) {
        this.METROCARD_NUMBER = METROCARD_NUMBER;
        this.BALANCE_IN_THE_METROCARD = 0;
        this.journey_count = 0;
    }

    addBalance(amount) {
        this.BALANCE_IN_THE_METROCARD += amount;
    }

    getBalance() {
        return this.BALANCE_IN_THE_METROCARD;
    }

    deductBalance(amount) {
        this.BALANCE_IN_THE_METROCARD -= amount;
        return this.getBalance();
    }

    availJourney(amount) {
        let revision = this.deductBalance(amount);
        this.journey_count++;
        return revision;
    }
}

module.exports = MetroCard;