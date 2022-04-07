const { meters } = require("../meters/meters");
const { pricePlanNames } = require("./price-plans");
const { readings } = require("../readings/readings");
const { compare, recommend, getLastWeekUsageCost, getLastWeekUsageCostRank} = require("./price-plans-controller");

describe("price plans", () => {
    it("should compare usage cost for all price plans", () => {
        const { getReadings } = readings({
            [meters.METER0]: [
                { time: 1607686125, reading: 0.26785 },
                { time: 1607599724, reading: 0.26785 },
                { time: 1607513324, reading: 0.26785 },
            ],
        });

        const expected = {
            pricePlanComparisons: [
                {
                    [pricePlanNames.PRICEPLAN0]: 0.26785 * 10,
                },
                {
                    [pricePlanNames.PRICEPLAN1]: 0.26785 * 2,
                },
                {
                    [pricePlanNames.PRICEPLAN2]: 0.26785 * 1,
                },
            ],
            smartMeterId: meters.METER0
        };

        const recommendation = compare(getReadings, {
            params: {
                smartMeterId: meters.METER0,
            },
            query: {}
        });

        expect(recommendation).toEqual(expected);
    });

    it("should recommend usage cost for all price plans by ordering from cheapest to expensive", () => {
        const { getReadings } = readings({
            [meters.METER0]: [
                { time: 1607686125, reading: 0.26785 },
                { time: 1607599724, reading: 0.26785 },
                { time: 1607513324, reading: 0.26785 },
            ],
        });

        const expected = [
            {
                [pricePlanNames.PRICEPLAN2]: 0.26785 * 1,
            },
            {
                [pricePlanNames.PRICEPLAN1]: 0.26785 * 2,
            },
            {
                [pricePlanNames.PRICEPLAN0]: 0.26785 * 10,
            },
        ];

        const recommendation = recommend(getReadings, {
            params: {
                smartMeterId: meters.METER0,
            },
            query: {}
        });

        expect(recommendation).toEqual(expected);
    });

    it("should limit recommendation", () => {
        const { getReadings } = readings({
            [meters.METER0]: [
                { time: 1607686125, reading: 0.26785 },
                { time: 1607599724, reading: 0.26785 },
                { time: 1607513324, reading: 0.26785 },
            ],
        });

        const expected = [
            {
                [pricePlanNames.PRICEPLAN2]: 0.26785 * 1,
            },
            {
                [pricePlanNames.PRICEPLAN1]: 0.26785 * 2,
            },
        ];

        const recommendation = recommend(getReadings, {
            params: {
                smartMeterId: meters.METER0,
            },
            query: {
                limit: 2
            }
        });

        expect(recommendation).toEqual(expected);
    });

    it('should return last week usage',  () => {
        const { getReadings } = readings({
            [meters.METER0]: [
                { time: 1607686125, reading: 0.26785 },
                { time: 1607599724, reading: 0.26785 },
                { time: 1607513324, reading: 0.26785 },
            ],
        });

        const expected =
            {
                "smartMeterId": "smart-meter-0",
                "specificLastWeekUsageCost": "2.6785",
                "specificSupplier": "Dr Evil's Dark Energy"
            }
        ;

        const lastWeekUsage = getLastWeekUsageCost(getReadings, {
            params: {
                smartMeterId: meters.METER0,
            },
        });

        expect(lastWeekUsage).toEqual(expected);
    });

    it('should return last week usage and ranks',  () => {
        const {getReadings} = readings({
            [meters.METER0]: [
                {
                    "time": 1607686125,
                    "reading": 1
                },
                {
                    "time": 1607682525,
                    "reading": 2
                },
                {
                    "time": 1607678925,
                    "reading": 3
                },
                {
                    "time": 1607675325,
                    "reading": 4
                },
                {
                    "time": 1607671725,
                    "reading": 5
                },
                {
                    "time": 1607668125,
                    "reading": 6
                },
                {
                    "time": 1607664525,
                    "reading": 7
                }]
        })

        const expected = {
            "lastWeekUsageCost": {
                "smartMeterId": "smart-meter-0",
                "specificLastWeekUsageCost": "40.0000",
                "specificSupplier": "Dr Evil's Dark Energy"
            },
            "differentDaysRanks": [
                {
                    "dayOfWeek": "seventhDay",
                    "cost": 10
                },
                {
                    "dayOfWeek": "sixthDay",
                    "cost": 20
                },
                {
                    "dayOfWeek": "fifthDay",
                    "cost": 30
                },
                {
                    "dayOfWeek": "fourthDay",
                    "cost": 40
                },
                {
                    "dayOfWeek": "thirdDay",
                    "cost": 50
                },
                {
                    "dayOfWeek": "secondDay",
                    "cost": 60
                },
                {
                    "dayOfWeek": "firstDay",
                    "cost": 70
                }
            ]
        };


        const lastWeekUsageCostRank = getLastWeekUsageCostRank(getReadings, {
            params: {
                smartMeterId: meters.METER0,
            },
        });

        expect(lastWeekUsageCostRank).toEqual(expected);
    });
});
