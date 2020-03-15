'use strict';

const fs = require('fs');

let rawData = fs.readFileSync('../data/counties.json');
let counties = JSON.parse(rawData);

counties.features.forEach(feature => {
    if(feature.properties.COUNTY === undefined || feature.properties.COUNTY.length === 0) {
        console.log("huzzah!");
    }
});