'use strict';

const csv = require('csv-parser');
const fs = require('fs');
const results = [];

fs.createReadStream('../data/compost_services.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    fs.writeFileSync('../data/compost_services.js', JSON.stringify(results));
  });