const { pricePlans } = require("./price-plans");
const { usageForAllPricePlans, usageCost} = require("../usage/usage");
const { meterPricePlanMap } = require("../meters/meters");
const { amountCompare } = require("../price-plans/amount-compare");
const { getDifferentDaysCost } = require("./get-different-days-cost");

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
    const specificLastWeekUsageCost = usageCost(getReadings(meter),specificRate);
    return {
        smartMeterId: req.params.smartMeterId,
        specificLastWeekUsageCost:specificLastWeekUsageCost,
        specificSupplier: specificSupplier,
    }
};

const getLastWeekUsageCostRank = (getReadings, req) => {
    const meter = req.params.smartMeterId;
    if (!meterPricePlanMap.hasOwnProperty(meter)) {
        return "Your SmartMeterId is not right!";
    }

    const specificRate = meterPricePlanMap[meter].rate;
    const differentDaysRanks = getDifferentDaysCost(getReadings(meter), specificRate).sort(amountCompare("cost"));

    return {
        lastWeekUsageCost: getLastWeekUsageCost(getReadings, req),
        differentDaysRanks: differentDaysRanks
    }
};

module.exports = { recommend, compare, getLastWeekUsageCost, getLastWeekUsageCostRank};
