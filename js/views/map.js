var ymaps = require('ymaps'),
    config = require('config'),
    character = require('characterView');

/**
 *
 * @param {String|jQuery|HTMLElement} el
 * @return {ymaps.Map}
 */
function map(el) {
    el = $(el || '#map')[0];
    var map = new ymaps.Map(el, config.map);

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
