'use strict';

const fs = require('fs');

let states = JSON.parse(fs.readFileSync('../data/lots/parsed_to_json/states.json'));
let bans = JSON.parse(fs.readFileSync('../data/lots/parsed_to_json/bans.json'));
let lobsters = JSON.parse(fs.readFileSync('../data/lots/parsed_to_json/lobsters.json'));
let customers = JSON.parse(fs.readFileSync('../data/lots/parsed_to_json/customers.json'));
let cities = JSON.parse(fs.readFileSync('../data/lots/parsed_to_json/cities.json'));
cities.forEach(city => city.zips = city.zips.split(" "));

const FINAL_OBJECT = {};
states.forEach(state => FINAL_OBJECT[state.short] = { name: state.name });

Object.keys(FINAL_OBJECT).forEach(stateKey => {
  FINAL_OBJECT[stateKey].cities = cities.filter(city => city.state_id === stateKey);

  FINAL_OBJECT[stateKey].cities.forEach(city => {
    city.ban = bans.filter(ban => city.city.toLowerCase() === ban.City.toLowerCase())
  });

  lobsters.forEach(lobster => {
    if (lobster.ST !== stateKey) return;

    let redCity = FINAL_OBJECT[stateKey].cities.find(city =>
      city.zips.find(zip => zip === lobster['Zip Code2']) !== undefined
    );
    if (redCity !== undefined) {
      redCity.lobster = lobster;
    }
  });

  customers.forEach(customer => {
    if (FINAL_OBJECT[stateKey].name.toLowerCase() === customer.State.toLowerCase()) return;

    let customerCity = FINAL_OBJECT[stateKey].cities.find(city =>
      city.zips.find(zip => zip === customer['Zip Code']) !== undefined
    );
    if (customerCity !== undefined) {
      customerCity.customer = customer;
    }
  })
});

FINAL_OBJECT.meta = {
  composters: JSON.parse(fs.readFileSync('../data/lots/parsed_to_json/composters.json')),
  facilities: JSON.parse(fs.readFileSync('../data/lots/parsed_to_json/facilities.json'))
};

fs.writeFileSync('../data/lots/parsed_to_json/data.json', JSON.stringify(FINAL_OBJECT));