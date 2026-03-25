const TravelHandler = require("./travel_handler");
const MetroCard = require("./metro_card");

class TicketHandler {
    //Singleton class ideally

    constructor() {
        this.METROCARD_NUMBERS = [];
        this.METROCARDS = {};
        this.LOCATION_TRAVEL_HANDLERS = [];
        this.TRAVEL_HANDLERS = {};
    }

    handleBalance(METROCARD_NUMBER, BALANCE_IN_THE_METROCARD) {
        let card;
        if (this.METROCARD_NUMBERS.indexOf(METROCARD_NUMBER) < 0) {
            card = new MetroCard(METROCARD_NUMBER);
            this.METROCARD_NUMBERS.push(METROCARD_NUMBER);
        } else card = this.METROCARDS[METROCARD_NUMBER];
        card.addBalance(BALANCE_IN_THE_METROCARD);
        this.METROCARDS[METROCARD_NUMBER] = card;
    }

    handleJourney(METROCARD_NUMBER, PASSENGER_TYPE, FROM_STATION) {
        let locationMetroStation;
        if (this.LOCATION_TRAVEL_HANDLERS.indexOf(FROM_STATION) < 0) {
            locationMetroStation = new TravelHandler(FROM_STATION);
            this.LOCATION_TRAVEL_HANDLERS.push(FROM_STATION);
        } else locationMetroStation = this.TRAVEL_HANDLERS[FROM_STATION];
        let updatedMetroCard = locationMetroStation.checkIn(
            this.METROCARDS[METROCARD_NUMBER],
            PASSENGER_TYPE
        );
        this.METROCARDS[METROCARD_NUMBER] = updatedMetroCard;
        this.TRAVEL_HANDLERS[FROM_STATION] = locationMetroStation;
    }

    printSummary() {
        const STATION_ORDER = ["CENTRAL", "AIRPORT"];

        for (const station of STATION_ORDER) {
            const travelHandler = this.TRAVEL_HANDLERS[station];
            const total_amount =
                travelHandler.TOTAL_COLLECTION + travelHandler.SERVICE_FEE;
            console.log(
                `TOTAL_COLLECTION ${travelHandler.FROM_STATION} ${total_amount} ${travelHandler.DISCOUNTED_FARE}`
            );
            console.log("PASSENGER_TYPE_SUMMARY");
            const counts = travelHandler.sortCounts();
            for (const [type, count] of counts) {
                if (count != 0) console.log(`${type} ${count}`);
            }
        }
    }
}

module.exports = new TicketHandler();