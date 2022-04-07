const getDifferentDaysCost = (readings, rate) => {

    let firstDayAmount = 0;
    let secondDayAmount = 0;
    let thirdDayAmount = 0;
    let fourthDayAmount = 0;
    let fifthDayAmount = 0;
    let sixthDayAmount = 0;
    let sevenDayAmount = 0;

    for (let i = 0; i < readings.length; i++) {
        if ((i + 1) % 7 === 0) {
            firstDayAmount += readings[i].reading;
        } else if ((i + 1) % 7 === 6) {
            secondDayAmount += readings[i].reading;
        } else if ((i + 1) % 7 === 5) {
            thirdDayAmount += readings[i].reading;
        } else if ((i + 1) % 7 === 4) {
            fourthDayAmount += readings[i].reading;
        } else if ((i + 1) % 7 === 3) {
            fifthDayAmount += readings[i].reading;
        } else if ((i + 1) % 7 === 2) {
            sixthDayAmount += readings[i].reading;
        } else if ((i + 1) % 7 === 1) {
            sevenDayAmount += readings[i].reading;
        }
    }

    const differentDaysCost = [
        {dayOfWeek: "firstDay", cost: firstDayAmount * rate},
        {dayOfWeek: "secondDay", cost: secondDayAmount * rate},
        {dayOfWeek: "thirdDay", cost: thirdDayAmount * rate},
        {dayOfWeek: "fourthDay", cost: fourthDayAmount * rate},
        {dayOfWeek: "fifthDay", cost: fifthDayAmount * rate},
        {dayOfWeek: "sixthDay", cost: sixthDayAmount * rate},
        {dayOfWeek: "seventhDay", cost: sevenDayAmount * rate},
    ];

    return differentDaysCost;
};

module.exports = { getDifferentDaysCost };