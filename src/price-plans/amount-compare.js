const amountCompare = (p) => {
    return function (m, n) {
        let a = m[p];
        let b = n[p];
        return a - b;
    };
};

module.exports = { amountCompare };