'use strict';

const csv = require('csv-parser');
const fs = require('fs');
const results = [];

fs.createReadStream('../data/us_cities_lat_long.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    fs.writeFileSync('../data/us_cities.js', JSON.stringify(results));
  });