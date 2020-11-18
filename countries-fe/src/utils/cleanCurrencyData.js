const fs = require('fs');

//run from src directory
fs.readFile('./assets/currencyCodes.json', (err, data) => {
    if (err) return console.error(err);

    const jsonData = JSON.parse(data);

    const newData = jsonData.reduce((a, b) => {
        const key = b['AlphabeticCode'];
        const val = b['Currency'];
        if (a[key] && !a[key].includes(val)) {
            a[key].push(val);
        } else {
            a[key] = [val];
        }
        return a;
    }, {});

    const newJsonData = JSON.stringify(newData);

    fs.writeFile('./assets/currencies.json', newJsonData, (err, data) => {
        if (err) return console.error(err);

        // console.log(data);
    });
});
