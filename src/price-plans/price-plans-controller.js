const { pricePlans } = require("./price-plans");
const { usageForAllPricePlans, usageCost, usage, average, timeElapsedInHours} = require("../usage/usage");
const { meterPricePlanMap } = require("../meters/meters");

const recommend = (getReadings, req) => {
    const meter = req.params.smartMeterId;
    const pricePlanComparisons = usageForAllPricePlans(pricePlans, getReadings(meter)).sort((a, b) => extractCost(a) - extractCost(b))
    if("limit" in req.query) {
        return pricePlanComparisons.slice(0, req.query.limit);
    }
    return pricePlanComparisons;
};

const extractCost = (cost) => {
    const [, value] = Object.entries(cost).find(([key]) => key in pricePlans);
    return value
}

const compare = (getData, req) => {
    const meter = req.params.smartMeterId;
    const pricePlanComparisons = usageForAllPricePlans(pricePlans, getData(meter));
    return {
        smartMeterId: req.params.smartMeterId,
        pricePlanComparisons,
    };
};

const getLastWeekUsageCost = (getReadings, req) => {
    const meter = req.params.smartMeterId;
    if (!meterPricePlanMap.hasOwnProperty(meter)) {
        return "Your SmartMeterId is not right!";
    }

    const specificRate = meterPricePlanMap[meter].rate;
    const specificSupplier = meterPricePlanMap[meter].supplier;
    const specificLastWeekUsage = usageCost(getReadings(meter),specificRate);
    return {
        smartMeterId: req.params.smartMeterId,
        specificLastWeekUsage:specificLastWeekUsage,
        specificSupplier: specificSupplier,
    }
};

const getLastWeekUsageCostRank = (getReadings, req) => {
    const meter = req.params.smartMeterId;
    if (!meterPricePlanMap.hasOwnProperty(meter)) {
        return "Your SmartMeterId is not right!";
    }

    let differentDaysReadings = new Map();
    let Monday = new Array(24);
    let Tuesday = new Array(24);
    let Wednesday = new Array(24);
    let Thursday = new Array(24);
    let Friday = new Array(24);
    let Saturday = new Array(24);
    let Sunday = new Array(24);
    let MondayAmount = 0;
    let TuesdayAmount = 0;
    let WednesdayAmount = 0;
    let ThursdayAmount = 0;
    let FridayAmount = 0;
    let SaturdayAmount = 0;
    let SundayAmount = 0;
    for (let i = 0; i < 24; i++) {
        Monday[i] = getReadings(meter)[i];
        differentDaysReadings.set("Monday", Monday);
        MondayAmount = MondayAmount + Monday[i].reading;
    }
    for (let i = 0; i < 24; i++) {
        Tuesday[i] = getReadings(meter)[i + 24];
        differentDaysReadings.set("Tuesday", Tuesday);
        TuesdayAmount = TuesdayAmount + Tuesday[i].reading;
    }
    for (let i = 0; i < 24; i++) {
        Wednesday[i] = getReadings(meter)[i + 48];
        differentDaysReadings.set("Wednesday", Wednesday);
        WednesdayAmount = WednesdayAmount + Wednesday[i].reading;
    }
    for (let i = 0; i < 24; i++) {
        Thursday[i] = getReadings(meter)[i + 72];
        differentDaysReadings.set("Thursday", Thursday);
        ThursdayAmount = ThursdayAmount + Thursday[i].reading;
    }
    for (let i = 0; i < 24; i++) {
        Friday[i] = getReadings(meter)[i + 96];
        differentDaysReadings.set("Friday", Friday);
        FridayAmount = FridayAmount + Friday[i].reading;
    }
    for (let i = 0; i < 24; i++) {
        Saturday[i] = getReadings(meter)[i + 120];
        differentDaysReadings.set("Saturday", Saturday);
        SaturdayAmount = SaturdayAmount + Saturday[i].reading;
    }
    for (let i = 0; i < 24; i++) {
        Sunday[i] = getReadings(meter)[i + 144];
        differentDaysReadings.set("Sunday", Sunday);
        SundayAmount = SundayAmount + Sunday[i].reading;
    }
    const differentDaysAmount = [
        {dayOfWeek: "Monday", amount: MondayAmount},
        {dayOfWeek: "Tuesday", amount: TuesdayAmount},
        {dayOfWeek: "Wednesday", amount: WednesdayAmount},
        {dayOfWeek: "Thursday", amount: ThursdayAmount},
        {dayOfWeek: "Friday", amount: FridayAmount},
        {dayOfWeek: "Saturday", amount: SaturdayAmount},
        {dayOfWeek: "Sunday", amount: SundayAmount},
    ];
    function compare(p){
        return function(m,n){
            let a = m[p];
            let b = n[p];
            return a - b;
        }
    }
    return {
        lastWeekUsageCost: getLastWeekUsageCost(getReadings, req),
        differentDaysRanks: differentDaysAmount.sort(compare("amount"))
    }
};


module.exports = { recommend, compare, getLastWeekUsageCost, getLastWeekUsageCostRank};
