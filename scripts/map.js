window.addEventListener('load', function() {
    // create a map in the "map" div, set the view to a given place and zoom
    var map = L.map('map').setView([48.2, 16.37], 8);

    // Mapbox Terrain Layer
    L.tileLayer('http://{s}.tiles.mapbox.com/v3/mlocher.map-e4hq4f2l/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://mapbox.com">Mapbox</a>'
    }).addTo(map);
});
