var map = L.map('map').setView([38, -95], 4);
L.tileLayer.provider('CartoDB.DarkMatter').addTo(map);

const color_picker = status => {
    switch (status) {
        case "allowed":
            return "green";
        case "changing":
            return "yellow";
        default:                // banned
            return "red";
    }
};

const highlightFeature = event => {
    // var layer = event.target;
    //
    // layer.setStyle({
    //     weight: 5,
    //     color
    //     fillOpacity: 0.7
    // });
    //
    // if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    //     layer.bringToFront();
    // }
};

const resetHighlight = event => {

};

const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.popupContent) {
        popupBody = `
            <h2>${feature.properties.NAME}</h2>
            <h3 style="margin-bottom: 0.25rem;">Status</h3><span style="text-transform: capitalize">${feature.properties.status}</span>            
            <h3 style="margin: 1rem 0 0.25rem 0;">Senator</h3><span>${feature.properties.popupContent.senator}</span>
        `;

        layer.bindPopup(feature.properties.COUNTY === undefined ? popupBody : `<h2>${feature.properties.NAME}</h2>`);
    }

    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
    })
};

const zoomer = () => {
    if(map.getZoom() === 6) {
        STATES_LAYER.remove();

        if(COUNTIES_LAYER === null) {
            COUNTIES_LAYER = L.geoJSON(
                US_COUNTIES,
                featureOptions
            ).addTo(map);
        } else {
            COUNTIES_LAYER.addTo(map);
        }
    } else if (map.getZoom() === 5) {
        if(COUNTIES_LAYER !== null) COUNTIES_LAYER.remove();
        STATES_LAYER.addTo(map);
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
).addTo(map);

let COUNTIES_LAYER = null;

map.on('zoomend', zoomer);