var config = {
    character: {
        sprite_size: 64,
        sprite_scale: 0.5,
        sprite_url: '/images/characters.png'
    },

    ymapsApi: '//api-maps.yandex.ru/2.0.30/?coordorder=longlat&load=package.standard&lang=%lang',

    map: {
        center: [60.597223, 56.837992],
        zoom: 15,
        type: 'yandex#satellite',
        behaviors: ['default', 'scrollZoom']
    }
};

module.exports = config;
