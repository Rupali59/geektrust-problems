class TravelHandler {
    constructor(FROM_STATION) {
        this.FROM_STATION = FROM_STATION;
        this.FARE = {
            ADULT: 200,
            SENIOR_CITIZEN: 100,
            KID: 50,
        };
        this.SERVICE_FEE = 0;
        this.TOTAL_COLLECTION = 0;
        this.DISCOUNTED_FARE = 0;
        this.counts = {
            ADULT: 0,
            KID: 0,
            SENIOR_CITIZEN: 0,
        };
    }

    checkIn(METROCARD, PASSENGER_TYPE) {
        let previousBalance = METROCARD.getBalance();
        let appliedFare = this.FARE[PASSENGER_TYPE];
        if (METROCARD.journey_count % 2 == 1) {
            appliedFare /= 2;
            this.DISCOUNTED_FARE += appliedFare;
        }
        if (previousBalance < appliedFare)
            this.rechargeCard(METROCARD, previousBalance, appliedFare);
        this.payForJourney(METROCARD, appliedFare);
        this.counts[PASSENGER_TYPE]++;
        return METROCARD;
    }

    rechargeCard(METROCARD, previousBalance, appliedFare) {
        let finalBalance = appliedFare - previousBalance;
        METROCARD.addBalance(finalBalance);
        let transactionFee = Math.round((2 * finalBalance) / 100);
        this.SERVICE_FEE += transactionFee;
    }

    payForJourney(METROCARD, appliedFare) {
        METROCARD.availJourney(appliedFare);
        this.TOTAL_COLLECTION += appliedFare;
    }

    sortCounts() {
        return Object.entries(this.counts).sort((a, b) => b[1] - a[1]);
    }
}

module.exports = TravelHandler;