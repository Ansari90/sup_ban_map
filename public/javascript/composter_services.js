const MAP = L.map('map').setView([38, -95], 4);
L.tileLayer.provider('CartoDB.Positron').addTo(MAP);

const COMPOSTER_LIST = document.getElementsByClassName('list')[0];
const COMPOSTER_DATA = document.getElementsByClassName('data')[0];

const CITY_INPUT = document.getElementById('location_input');
const RADIUS_INPUT = document.getElementById('radius_input');

// {
//  "name":"CompostNow",
//  "url":"http://compostnow.org/triangle",
//  "email":"thedirt@compostnow.org",
//  "phone":"919-526-0403",
//  "city":"Triangle",
//  "state_province":"NC",
//  "in_business":"1",
//  "lat":"35.899942",
//  "lng":"-78.906192"
// }

// {
//   "city":"South Creek",
//   "lat":"46.9994",
//   "lng":"-122.3921"
// }

const COMPOSTER_MARKERS = COMPOSTERS.map((composter, index) => {
  COMPOSTER_LIST.innerHTML += createListItem(composter, index);
  let marker =  L.marker([composter.lat, composter.lng]);
  marker.on('click', () => {
    let list_item_id = `composter_${index}`;
    document.getElementById(list_item_id).scrollIntoView(true);
    colorSelectedListItem(list_item_id);
    populateData(composter);
  });
  marker.bindPopup(`<h3>${composter.name}</h3>`);
  marker.addTo(MAP);
  return marker;
});

const SELECTED_CLASS = "selected_item";
function colorSelectedListItem(item_id) {
  let existingSelected = document.getElementsByClassName(SELECTED_CLASS)[0];
  if(existingSelected !== undefined) {
    existingSelected.classList.remove(SELECTED_CLASS);
  }
  document.getElementById(item_id).classList.add(SELECTED_CLASS);
}

function createListItem(composter, index) {
  return `
    <div
      id="composter_${index}" 
      class="item_div ${index%2 === 0 ? 'odd_item' : 'even_item'}"
      onclick="populateDataAndCenterOnMarker(${index})"
    >
      <h3>${composter.name}</h3>
    </div>
  `;
}

function populateDataAndCenterOnMarker(composter_index) {
  colorSelectedListItem(`composter_${composter_index}`);
  let composter = COMPOSTERS[composter_index];
  COMPOSTER_MARKERS.forEach((marker, index) => {
    if(index !== composter_index) {
      marker.remove();
    } else {
      marker.addTo(MAP).openPopup();
      MAP.setView([composter.lat, composter.lng], 6);
    }
  });
  populateData(composter);
}

function populateData(composter) {
  COMPOSTER_DATA.innerHTML = `
    <h2>${composter.name}</h2>
    <h3>${composter.city}, ${composter.state_province}</h3>
    <p>Phone: ${composter.phone}</p>
    <p>Email: ${composter.email}</p>
    <a href="${composter.url}" target="_blank">Visit</a>
  `;
}

function addAllMarkersToMap() {
  COMPOSTER_MARKERS.forEach(marker => marker.addTo(MAP));
}

const USER_FILTERED = {
  cityCircle: undefined,
  compostersInRange: []
};
function findCompostersNearCity() {
  let city = CITIES.find(city_object => city_object.city.toLowerCase().includes(CITY_INPUT.value.toLowerCase().trim()));
  let maxDistance = Math.floor(parseInt(RADIUS_INPUT.value.trim()));

  if(USER_FILTERED.cityCircle !== undefined) {
    USER_FILTERED.cityCircle.remove();
  }
  USER_FILTERED.cityCircle = L.circle([city.lat, city.lng], {
    color: 'green',
    fillColor: '#90EE90',
    fillOpacity: 0.5,
    radius: maxDistance * 1000
  }).addTo(MAP);

  USER_FILTERED.compostersInRange = COMPOSTERS.filter(composter => {
    let distanceInMeters = window.geolib.getPreciseDistance(
      { latitude: city.lat, longitude: city.lng },
      { latitude: composter.lat, longitude: composter.lng }
    );

    return (Math.floor(distanceInMeters/1000) <= maxDistance);
  });
}