const MAP = L.map('map').setView([38, -95], 4);
const lightTileLayer = L.tileLayer.provider('CartoDB.Positron').addTo(MAP);

const CITY_INFO = document.getElementsByClassName('city')[0];
const PROVIDERS_INFO = document.getElementsByClassName('providers')[0];
const RECYCLERS_INFO = document.getElementsByClassName('recyclers')[0];

const color_picker = (status) => {
  switch(status) {
    case BAN_STATUS.a:
      return `<h4 style='background-color: #00FF00; width: 100px;'>${BAN_STATUS.a}</h4>`;
    case BAN_STATUS.p:
      return `<h4 style='background-color: #FFA500; width: 100px;'>${BAN_STATUS.p}</h4>`;
    case BAN_STATUS.b:
      return `<h4 style='background-color: #FF0000; width: 100px;'>${BAN_STATUS.b}</h4>`;
  }
}

const CITY_MARKERS = CITIES.map((city, index) => {
  let marker = L.marker(city.coords);
  marker.on('click', () => {
    let city_name = `<h3>${city.name}</h3>`
    CITY_INFO.innerHTML = city_name + color_picker(city.status);

    let active_providers = PROVIDERS_INFO.map(provider => {

    });
    PROVIDERS_INFO.innerHTML = `
    `
  });
  return marker;
});

let GEORGIA_LAYER = L.geoJSON(
  GEORGIA_JSON,
  {
    style: () => ({
      fillColor: 'lime',
      weight: 1,
      opacity: 1,
      dashArray: '2',
      fillOpacity: 0.1
    })
  }
).addTo(MAP);

const zoomer = () => {
  if (MAP.getZoom() === 7) {
    CITY_MARKERS.forEach(marker => marker.addTo(MAP));
    GEORGIA_LAYER.remove();
  } else if (MAP.getZoom() === 6) {
    CITY_MARKERS.forEach(marker => marker.remove());
    GEORGIA_LAYER.addTo(MAP);
  }
};

MAP.on('zoomend', zoomer);
