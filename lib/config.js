/**
 * @module config
 */

/**
 * @namespace
 * @type {Object}
 */
var config = {
    character: {
        sprite_size: 64,
        sprite_scale: 0.5,
        sprite_url: 'images/characters-2.png',
        default_photo: 'http://placehold.it/1280x1024'
    },

    charactersCount: 11,

    ymapsApi: 'http://api-maps.yandex.ru/2.0.30/?coordorder=longlat&load=package.standard&lang=%lang',

    mapState: {
        center: [60.650875169164664, 56.84878426050872],
        zoom: 16,
        type: 'yandex#satellite',
        behaviors: ['default', 'scrollZoom']
    },

    mapOptions: {
        minZoom: 13,
        maxZoom: 23
    },

    newbie_days: 7,

    disqus: {
        shortname: '2layer'
    }
};

module.exports = config;
