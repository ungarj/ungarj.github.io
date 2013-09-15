window.addEventListener('load', function() {
    // create a map in the "map" div, set the view to a given place and zoom
    var map = L.map('map');

    // Mapbox Terrain Layer
    L.tileLayer('http://{s}.tiles.mapbox.com/v3/mlocher.map-e4hq4f2l/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://mapbox.com">Mapbox</a>'
    }).addTo(map);

    // Array of story section elements.
    var sections = document.getElementsByTagName('section');

    // Helper to set the active section.
    var setActive = function(index) {
        // Cache the active section and only run, when it changes
        if (document.getElementById('story').dataset.active == index) return true;
        document.getElementById('story').dataset.active = index;

        // Set active class on sections, markers.
        _(sections).each(function(s) { s.className = s.className.replace(' active', '') });
        sections[index].className += ' active';

        // Set a body class for the active section.
        document.body.className = 'section-' + index;

        // Zoom / Pan to the new center
        map.setView(new L.LatLng(sections[index].getAttribute('data-latitude'), sections[index].getAttribute('data-longitude')), sections[index].getAttribute('data-zoom'), { animate: true });

        return true;
    };

    // Bind to scroll events to find the active section.
    document.getElementById('story').addEventListener('scroll', _(function() {
        var story = document.getElementById('story');

        // All Browsers, might not work on IE8
        var y = story.scrollTop;
        var h = story.offsetHeight;

        // If scrolled to the very top of the page set the first section active.
        if (y === 0) return setActive(0);

        // Otherwise, conditionally determine the extent to which page must be
        // scrolled for each section. The first section that matches the current
        // scroll position wins and exits the loop early.
        var memo = 0;
        var buffer = (h * 0.2);
        var active = _(sections).any(function(el, index) {
            memo += el.offsetHeight;
            return y < (memo-buffer) ? setActive(index) : false;
        });

        // If no section was set active the user has scrolled past the last section.
        // Set the last section active.
        if (!active) setActive(sections.length - 1);
    }).debounce(10));

    // Set map to first section.
    setActive(0, false);});
