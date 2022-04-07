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
        const { getReadings } = readings({
            [meters.METER0]: [
                {
                    "time": 1607686125,
                    "reading": 1
                },
                {
                    "time": 1607682525,
                    "reading": 1
                },
                {
                    "time": 1607678925,
                    "reading": 1
                },
                {
                    "time": 1607675325,
                    "reading": 1
                },
                {
                    "time": 1607671725,
                    "reading": 1
                },
                {
                    "time": 1607668125,
                    "reading": 1
                },
                {
                    "time": 1607664525,
                    "reading": 1
                },
                {
                    "time": 1607660925,
                    "reading": 1
                },
                {
                    "time": 1607657325,
                    "reading": 1
                },
                {
                    "time": 1607653725,
                    "reading": 1
                },
                {
                    "time": 1607650125,
                    "reading": 1
                },
                {
                    "time": 1607646525,
                    "reading": 1
                },
                {
                    "time": 1607642925,
                    "reading": 1
                },
                {
                    "time": 1607639325,
                    "reading": 1
                },
                {
                    "time": 1607635725,
                    "reading": 1
                },
                {
                    "time": 1607632125,
                    "reading": 1
                },
                {
                    "time": 1607628525,
                    "reading": 1
                },
                {
                    "time": 1607624925,
                    "reading": 1
                },
                {
                    "time": 1607621325,
                    "reading": 1
                },
                {
                    "time": 1607617725,
                    "reading": 1
                },
                {
                    "time": 1607614125,
                    "reading": 1
                },
                {
                    "time": 1607610525,
                    "reading": 1
                },
                {
                    "time": 1607606925,
                    "reading": 1
                },
                {
                    "time": 1607603325,
                    "reading": 1
                },
                {
                    "time": 1607599725,
                    "reading": 2
                },
                {
                    "time": 1607596125,
                    "reading": 2
                },
                {
                    "time": 1607592525,
                    "reading": 2
                },
                {
                    "time": 1607588925,
                    "reading": 2
                },
                {
                    "time": 1607585325,
                    "reading": 2
                },
                {
                    "time": 1607581725,
                    "reading": 2
                },
                {
                    "time": 1607578125,
                    "reading": 2
                },
                {
                    "time": 1607574525,
                    "reading": 2
                },
                {
                    "time": 1607570925,
                    "reading": 2
                },
                {
                    "time": 1607567325,
                    "reading": 2
                },
                {
                    "time": 1607563725,
                    "reading": 2
                },
                {
                    "time": 1607560125,
                    "reading": 2
                },
                {
                    "time": 1607556525,
                    "reading": 2
                },
                {
                    "time": 1607552925,
                    "reading": 2
                },
                {
                    "time": 1607549325,
                    "reading": 2
                },
                {
                    "time": 1607545725,
                    "reading": 2
                },
                {
                    "time": 1607542125,
                    "reading": 2
                },
                {
                    "time": 1607538525,
                    "reading": 2
                },
                {
                    "time": 1607534925,
                    "reading": 2
                },
                {
                    "time": 1607531325,
                    "reading": 2
                },
                {
                    "time": 1607527725,
                    "reading": 2
                },
                {
                    "time": 1607524125,
                    "reading": 2
                },
                {
                    "time": 1607520525,
                    "reading": 2
                },
                {
                    "time": 1607516925,
                    "reading": 2
                },
                {
                    "time": 1607513325,
                    "reading": 3
                },
                {
                    "time": 1607509725,
                    "reading": 3
                },
                {
                    "time": 1607506125,
                    "reading": 3
                },
                {
                    "time": 1607502525,
                    "reading": 3
                },
                {
                    "time": 1607498925,
                    "reading": 3
                },
                {
                    "time": 1607495325,
                    "reading": 3
                },
                {
                    "time": 1607491725,
                    "reading": 3
                },
                {
                    "time": 1607488125,
                    "reading": 3
                },
                {
                    "time": 1607484525,
                    "reading": 3
                },
                {
                    "time": 1607480925,
                    "reading": 3
                },
                {
                    "time": 1607477325,
                    "reading": 3
                },
                {
                    "time": 1607473725,
                    "reading": 3
                },
                {
                    "time": 1607470125,
                    "reading": 3
                },
                {
                    "time": 1607466525,
                    "reading": 3
                },
                {
                    "time": 1607462925,
                    "reading": 3
                },
                {
                    "time": 1607459325,
                    "reading": 3
                },
                {
                    "time": 1607455725,
                    "reading": 3
                },
                {
                    "time": 1607452125,
                    "reading": 3
                },
                {
                    "time": 1607448525,
                    "reading": 3
                },
                {
                    "time": 1607444925,
                    "reading": 3
                },
                {
                    "time": 1607441325,
                    "reading": 3
                },
                {
                    "time": 1607437725,
                    "reading": 3
                },
                {
                    "time": 1607434125,
                    "reading": 3
                },
                {
                    "time": 1607430525,
                    "reading": 3
                },
                {
                    "time": 1607426925,
                    "reading": 4
                },
                {
                    "time": 1607423325,
                    "reading": 4
                },
                {
                    "time": 1607419725,
                    "reading": 4
                },
                {
                    "time": 1607416125,
                    "reading": 4
                },
                {
                    "time": 1607412525,
                    "reading": 4
                },
                {
                    "time": 1607408925,
                    "reading": 4
                },
                {
                    "time": 1607405325,
                    "reading": 4
                },
                {
                    "time": 1607401725,
                    "reading": 4
                },
                {
                    "time": 1607398125,
                    "reading": 4
                },
                {
                    "time": 1607394525,
                    "reading": 4
                },
                {
                    "time": 1607390925,
                    "reading": 4
                },
                {
                    "time": 1607387325,
                    "reading": 4
                },
                {
                    "time": 1607383725,
                    "reading": 4
                },
                {
                    "time": 1607380125,
                    "reading": 4
                },
                {
                    "time": 1607376525,
                    "reading": 4
                },
                {
                    "time": 1607372925,
                    "reading": 4
                },
                {
                    "time": 1607369325,
                    "reading": 4
                },
                {
                    "time": 1607365725,
                    "reading": 4
                },
                {
                    "time": 1607362125,
                    "reading": 4
                },
                {
                    "time": 1607358525,
                    "reading": 4
                },
                {
                    "time": 1607354925,
                    "reading": 4
                },
                {
                    "time": 1607351325,
                    "reading": 4
                },
                {
                    "time": 1607347725,
                    "reading": 4
                },
                {
                    "time": 1607344125,
                    "reading": 4
                },
                {
                    "time": 1607340525,
                    "reading": 5
                },
                {
                    "time": 1607336925,
                    "reading": 5
                },
                {
                    "time": 1607333325,
                    "reading": 5
                },
                {
                    "time": 1607329725,
                    "reading": 5
                },
                {
                    "time": 1607326125,
                    "reading": 5
                },
                {
                    "time": 1607322525,
                    "reading": 5
                },
                {
                    "time": 1607318925,
                    "reading": 5
                },
                {
                    "time": 1607315325,
                    "reading": 5
                },
                {
                    "time": 1607311725,
                    "reading": 5
                },
                {
                    "time": 1607308125,
                    "reading": 5
                },
                {
                    "time": 1607304525,
                    "reading": 5
                },
                {
                    "time": 1607300925,
                    "reading": 5
                },
                {
                    "time": 1607297325,
                    "reading": 5
                },
                {
                    "time": 1607293725,
                    "reading": 5
                },
                {
                    "time": 1607290125,
                    "reading": 5
                },
                {
                    "time": 1607286525,
                    "reading": 5
                },
                {
                    "time": 1607282925,
                    "reading": 5
                },
                {
                    "time": 1607279325,
                    "reading": 5
                },
                {
                    "time": 1607275725,
                    "reading": 5
                },
                {
                    "time": 1607272125,
                    "reading": 5
                },
                {
                    "time": 1607268525,
                    "reading": 5
                },
                {
                    "time": 1607264925,
                    "reading": 5
                },
                {
                    "time": 1607261325,
                    "reading": 5
                },
                {
                    "time": 1607257725,
                    "reading": 5
                },
                {
                    "time": 1607254125,
                    "reading": 6
                },
                {
                    "time": 1607250525,
                    "reading": 6
                },
                {
                    "time": 1607246925,
                    "reading": 6
                },
                {
                    "time": 1607243325,
                    "reading": 6
                },
                {
                    "time": 1607239725,
                    "reading": 6
                },
                {
                    "time": 1607236125,
                    "reading": 6
                },
                {
                    "time": 1607232525,
                    "reading": 6
                },
                {
                    "time": 1607228925,
                    "reading": 6
                },
                {
                    "time": 1607225325,
                    "reading": 6
                },
                {
                    "time": 1607221725,
                    "reading": 6
                },
                {
                    "time": 1607218125,
                    "reading": 6
                },
                {
                    "time": 1607214525,
                    "reading": 6
                },
                {
                    "time": 1607210925,
                    "reading": 6
                },
                {
                    "time": 1607207325,
                    "reading": 6
                },
                {
                    "time": 1607203725,
                    "reading": 6
                },
                {
                    "time": 1607200125,
                    "reading": 6
                },
                {
                    "time": 1607196525,
                    "reading": 6
                },
                {
                    "time": 1607192925,
                    "reading": 6
                },
                {
                    "time": 1607189325,
                    "reading": 6
                },
                {
                    "time": 1607185725,
                    "reading": 6
                },
                {
                    "time": 1607182125,
                    "reading": 6
                },
                {
                    "time": 1607178525,
                    "reading": 6
                },
                {
                    "time": 1607174925,
                    "reading": 6
                },
                {
                    "time": 1607171325,
                    "reading": 6
                },
                {
                    "time": 1607167725,
                    "reading": 7
                },
                {
                    "time": 1607164125,
                    "reading": 7
                },
                {
                    "time": 1607160525,
                    "reading": 7
                },
                {
                    "time": 1607156925,
                    "reading": 7
                },
                {
                    "time": 1607153325,
                    "reading": 7
                },
                {
                    "time": 1607149725,
                    "reading": 7
                },
                {
                    "time": 1607146125,
                    "reading": 7
                },
                {
                    "time": 1607142525,
                    "reading": 7
                },
                {
                    "time": 1607138925,
                    "reading": 7
                },
                {
                    "time": 1607135325,
                    "reading": 7
                },
                {
                    "time": 1607131725,
                    "reading": 7
                },
                {
                    "time": 1607128125,
                    "reading": 7
                },
                {
                    "time": 1607124525,
                    "reading": 7
                },
                {
                    "time": 1607120925,
                    "reading": 7
                },
                {
                    "time": 1607117325,
                    "reading": 7
                },
                {
                    "time": 1607113725,
                    "reading": 7
                },
                {
                    "time": 1607110125,
                    "reading": 7
                },
                {
                    "time": 1607106525,
                    "reading": 7
                },
                {
                    "time": 1607102925,
                    "reading": 7
                },
                {
                    "time": 1607099325,
                    "reading": 7
                },
                {
                    "time": 1607095725,
                    "reading": 7
                },
                {
                    "time": 1607092125,
                    "reading": 7
                },
                {
                    "time": 1607088525,
                    "reading": 7
                },
                {
                    "time": 1607084925,
                    "reading": 7
                }
            ]
        });

        const expected = {
            "lastWeekUsageCost": {
                "smartMeterId": "smart-meter-0",
                "specificLastWeekUsageCost": 40,
                "specificSupplier": "Dr Evil's Dark Energy"
            },
            "differentDaysRanks": [
                {
                    "dayOfWeek": "seventhDay",
                    "cost": 240
                },
                {
                    "dayOfWeek": "sixthDay",
                    "cost": 480
                },
                {
                    "dayOfWeek": "fifthDay",
                    "cost": 720
                },
                {
                    "dayOfWeek": "fourthDay",
                    "cost": 960
                },
                {
                    "dayOfWeek": "thirdDay",
                    "cost": 1200
                },
                {
                    "dayOfWeek": "secondDay",
                    "cost": 1440
                },
                {
                    "dayOfWeek": "firstDay",
                    "cost": 1680
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
