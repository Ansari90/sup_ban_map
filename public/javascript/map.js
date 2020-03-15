const MAP = L.map('map').setView([38, -95], 4);
const darkTileLayer = L.tileLayer.provider('CartoDB.DarkMatter').addTo(MAP);
const lightTileLayer = L.tileLayer.provider('CartoDB.Positron');
let darkModeOn = true;
let highlightProvince = true;

document.addEventListener("keydown", evt => {
    if(evt.key === 'k') {
        highlightProvince = !highlightProvince;
    }
    if(evt.key === 'l') {
        if (darkModeOn) {
            darkTileLayer.remove();
            lightTileLayer.addTo(MAP);
        } else {
            lightTileLayer.remove();
            darkTileLayer.addTo(MAP);
        }
        darkModeOn = !darkModeOn;
    }
});

const color_picker = status => {
    switch (status) {
        case "allowed":
            return "green";
        case "changing":
            return "orange";
        default:                // banned
            return "red";
    }
};

const highlightFeature = event => {
    if(!highlightProvince) return;

    var feature = event.target;

    feature.setStyle({
        weight: 5,
        color: darkModeOn ? "beige" : "gray",
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        feature.bringToFront();
    }
};

const resetHighlight = event => {
    if(!highlightProvince) return;

    STATES_LAYER.resetStyle(event.target);
    if(COUNTIES_LAYER !== null) COUNTIES_LAYER.resetStyle(event.target);
};

const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.popupContent) {
        popupBody = `
            <h2>${feature.properties.NAME}</h2>
            <h3 style="margin-bottom: 0.25rem;">Status</h3><span style="text-transform: capitalize">${feature.properties.status}</span>            
            <h3 style="margin: 1rem 0 0.25rem 0;">Senator</h3><span>${feature.properties.popupContent.senator}</span>
        `;

        layer.bindPopup(feature.properties.COUNTY === undefined ? popupBody : `<h3>${feature.properties.NAME}</h3>`);
    }

    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
    });
};

const zoomer = () => {
    if(MAP.getZoom() === 7) {
        STATES_LAYER.remove();

        if(COUNTIES_LAYER === null) {
            COUNTIES_LAYER = L.geoJSON(
                US_COUNTIES,
                featureOptions
            ).addTo(MAP);
        } else {
            COUNTIES_LAYER.addTo(MAP);
        }
    } else if (MAP.getZoom() === 6) {
        if(COUNTIES_LAYER !== null) COUNTIES_LAYER.remove();
        STATES_LAYER.addTo(MAP);
    }
};

const featureOptions = {
    onEachFeature: onEachFeature,
    style: feature => {
        return {
            color: color_picker(feature.properties.status),
            weight: 1
        }
    }
};

let STATES_LAYER = L.geoJSON(
    US_STATES,
    featureOptions
).addTo(MAP);

let COUNTIES_LAYER = null;

var legend = L.control({position: 'bottomright'});

legend.onAdd = () => {

    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML += '<i style="background: #FF0000;"></i>Banned<br>';
    div.innerHTML += '<i style="background: #FFA500;"></i>Changing<br>';
    div.innerHTML += '<i style="background: #00FF00;"></i>Allowed<br>';

    return div;
};

legend.addTo(MAP);

MAP.on('zoomend', zoomer);