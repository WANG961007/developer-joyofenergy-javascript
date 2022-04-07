const amountCompare = (p) => {
    return function (m, n) {
        return m[p] - n[p];
    };
};

module.exports = { amountCompare };