const fs = require('fs');

//run from src directory
fs.readFile('./assets/languageCodes.json', (err, data) => {
    if (err) return console.error(err);

    const jsonData = JSON.parse(data);

    const newData = jsonData.reduce((newObj, curObj) => {
        const key = curObj['alpha2'];
        const val = curObj['English'].split(';')[0];

        newObj[key] = val;
        return newObj;
    }, {});

    const newJsonData = JSON.stringify(newData);

    fs.writeFile('./assets/languages.json', newJsonData, (err, data) => {
        if (err) return console.error(err);

        // console.log(data);
    });
});
