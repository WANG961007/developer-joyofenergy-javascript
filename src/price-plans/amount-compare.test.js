const {amountCompare} = require("./amount-compare");
describe("amount-compare", () => {
    it('should return right result when compare', () => {
        const testDataCost = [
            {dayOfWeek: "firstDay", cost: 1},
            {dayOfWeek: "secondDay", cost: 2},
        ]

        const expectResult = [
            {
                "dayOfWeek": "firstDay",
                "cost": 1
            },
            {
                "dayOfWeek": "secondDay",
                "cost": 2
            },
        ]

        const compare = testDataCost.sort(amountCompare("cost"));
        expect(compare).toEqual(expectResult);
    });
});