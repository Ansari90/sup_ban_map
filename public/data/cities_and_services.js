const BAN_STATUS = {
  'b': 'banned',
  'p': 'partial',
  'a': 'allowed'
};

const CITIES = [
  {
    name: 'Atlanta',
    coords: [33.755, -84.39],
    status: BAN_STATUS.b
  },
  {
    name: 'August',
    coords: [33.466667, -81.966667],
    status: BAN_STATUS.p
  },
  {
    name: 'Columbus',
    coords: [32.492222, -84.940278],
    status: BAN_STATUS.a
  },
  {
    name: 'Macon',
    coords: [32.834722, -83.651667],
    status: BAN_STATUS.a
  },
  {
    name: 'Savannah',
    coords: [32.016667, -81.116667],
    status: BAN_STATUS.p
  },
  {
    name: 'Athens',
    coords: [33.95, -83.383333],
    status: BAN_STATUS.b
  }
];

const PROVIDERS = [
  {
    name: 'ACME_Packaging',
    services: [BAN_STATUS.a, BAN_STATUS.b, BAN_STATUS.p],
    cities: [0, 1, 2, 3, 4, 5],
    price_multiplier: 2
  },
  {
    name: 'SimpleBoxes',
    services: [BAN_STATUS.p],
    cities: [2],
    price_multiplier: 0.5
  },
  {
    name: 'PackagePro',
    services: [BAN_STATUS.a, BAN_STATUS.b, BAN_STATUS.p],
    cities: [1, 3, 5],
    price_multiplier: 1.5
  },
  {
    name: 'EnviroPack',
    services: [BAN_STATUS.b],
    cities: [2, 5],
    price_multiplier: 1.25,
  },
  {
    name: 'PackHappy',
    services: [BAN_STATUS.b, BAN_STATUS.p],
    cities: [0, 4],
    price_multiplier: 0.85
  }
];

const RECYCLERS = [
  {
    name: 'GreenEarth',
    services: [BAN_STATUS.b, BAN_STATUS.a, BAN_STATUS.p],
    cities: [5],
    price_multiplier: 1
  },
  {
    name: 'HappyPlanet',
    services: [BAN_STATUS.a, BAN_STATUS.p],
    cities: [1, 3],
    price_multiplier: 1
  },
  {
    name: 'EcoFriends',
    services: [BAN_STATUS.b],
    cities: [4, 5],
    price_multiplier: 1.1
  },
  {
    name: 'EnviroPro',
    services: [BAN_STATUS.b, BAN_STATUS.a],
    cities: [0, 1, 2, 3, 4, 5],
    price_multiplier: 1.2
  }
];