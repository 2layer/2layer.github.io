var ymaps = require('ymaps'),
    character = require('characterView');

var geolocation = ymaps.geolocation,
    coords = [geolocation.longitude, geolocation.latitude];

/**
 *
 * @param {String|jQuery|HTMLElement} el
 * @return {ymaps.Map}
 */
function map(el) {
    el = $(el || '#map')[0];
    var map = new ymaps.Map(el, {
        center: coords,
        zoom: 14,
        type: 'yandex#satellite' || 'yandex#hybrid',
        behaviors: ['default', 'scrollZoom']
    });

    map.events.add('click', function (e) {
        var coords = e.get('coordPosition');

        var char = character({
            spriteId: 0 | Math.random() * 9,
            location: coords
        });

        map.geoObjects.add(char);
    });

    return map;
}

module.exports = map;
