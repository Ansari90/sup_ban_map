'use strict';

const fs = require('fs');

const generateRandomStatus = () => {
    let roll = Math.floor(Math.random() * 30);
    if(roll > 20) return 'allowed';
    if(roll > 10) return 'changing';
    return 'banned'
};

const generateRandomSenator = () => {
    let first_name = 'Patrick';
    let last_name = 'McDouglas';
    switch(Math.floor(Math.random() * 5)) {
        case 0:
            first_name = 'John';
            break;
        case 1:
            first_name = 'Stephen';
            break;
        case 2:
            first_name = 'Richard';
            break;
        case 3:
            first_name = 'Jamar';
            break;
    }
    switch(Math.floor(Math.random() * 5)) {
        case 0:
            last_name = 'Nash';
            break;
        case 1:
            last_name = 'Fitzgerald';
            break;
        case 2:
            last_name = 'Liebermann';
            break;
        case 3:
            last_name = 'Roth';
            break;
    }
    return first_name + " " + last_name;
};

let rawData = fs.readFileSync('../data/counties.json');
let counties = JSON.parse(rawData);
counties.features.forEach(feature => {
    feature.properties.status = generateRandomStatus();
    feature.properties.popupContent = {
        senator: generateRandomSenator()
    }
});

fs.writeFileSync('../data/counties-modified.json', JSON.stringify(counties));