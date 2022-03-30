const getDifferentDaysCost = (readings, rate) => {

    let firstDay = new Array(24);
    let secondDay = new Array(24);
    let thirdDay = new Array(24);
    let fourthDay = new Array(24);
    let fifthDay = new Array(24);
    let sixthDay = new Array(24);
    let seventhDay = new Array(24);
    let firstDayAmount = 0;
    let secondDayAmount = 0;
    let thirdDayAmount = 0;
    let fourthDayAmount = 0;
    let fifthDayAmount = 0;
    let sixthDayAmount = 0;
    let sevenDayAmount = 0;

    for (let i = 0; i < 24; i++) {
        firstDay[i] = readings[i + 144];
        secondDay[i] = readings[i + 120];
        thirdDay[i] = readings[i + 96];
        fourthDay[i] = readings[i + 72];
        fifthDay[i] = readings[i + 48];
        sixthDay[i] = readings[i + 24];
        seventhDay[i] = readings[i];

        firstDayAmount = firstDayAmount + firstDay[i].reading;
        secondDayAmount = secondDayAmount + secondDay[i].reading;
        thirdDayAmount = thirdDayAmount + thirdDay[i].reading;
        fourthDayAmount = fourthDayAmount + fourthDay[i].reading;
        fifthDayAmount = fifthDayAmount + fifthDay[i].reading;
        sixthDayAmount = sixthDayAmount + sixthDay[i].reading;
        sevenDayAmount = sevenDayAmount + seventhDay[i].reading;
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