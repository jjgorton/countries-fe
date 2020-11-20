export const swapKeyVal = (arr) => {
    const countryTable = {};

    function recurse(val, index) {
        if (typeof val !== 'object') {
            val = typeof val === 'string' ? val.toLowerCase() : val;
            if (countryTable[val]) {
                countryTable[val].add(index);
            } else {
                countryTable[val] = new Set().add(index);
            }
        } else {
            Object.values(val).forEach((obj) => obj && recurse(obj, index));
        }
    }

    arr.forEach((obj, index) => recurse(obj, index));

    return countryTable;
};
