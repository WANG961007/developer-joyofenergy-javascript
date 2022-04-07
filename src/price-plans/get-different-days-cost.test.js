const {readings} = require("../readings/readings");
const {meters} = require("../meters/meters");
const {getDifferentDaysCost} = require("./get-different-days-cost");
describe("get-different-days-cost", () => {
    it('should return different-days-cost', function () {
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

        const expectedResult = [
            {
                "dayOfWeek": "firstDay",
                "cost": 70
            },
            {
                "dayOfWeek": "secondDay",
                "cost": 60
            },
            {
                "dayOfWeek": "thirdDay",
                "cost": 50
            },
            {
                "dayOfWeek": "fourthDay",
                "cost": 40
            },
            {
                "dayOfWeek": "fifthDay",
                "cost": 30
            },
            {
                "dayOfWeek": "sixthDay",
                "cost": 20
            },
            {
                "dayOfWeek": "seventhDay",
                "cost": 10
            },
        ];

        const differentDaysCost = getDifferentDaysCost(getReadings([meters.METER0]), 10);
        expect(differentDaysCost).toEqual(expectedResult);
    });
});