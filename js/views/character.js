var ymaps = require('ymaps'),
    gallery = require('galleryView')(),
    config = require('config').character;

var sprite_size = config.sprite_size,
    sprite_scale = config.sprite_scale,
    sprite_url = config.sprite_url;

/**
 *
 * @param {Object} options
 * @param {Array}  options.location
 * @param {String} options.name
 * @param {String} options.photoUrl
 *
 * @return {ymaps.Placemark}
 */
function character(options) {
    var spriteId = options.spriteId,
        name = options.name || Math.random().toString(16);

    var placemark = new ymaps.Placemark(options.location, {
        hintContent: name
    }, {
        iconImageHref: sprite_url,
        iconImageSize: [sprite_size * sprite_scale, sprite_size * sprite_scale],
        iconImageClipRect: [[spriteId * sprite_size, 0], [(spriteId + 1) * sprite_size, sprite_size]],
        iconImageOffset: [-sprite_size * sprite_scale / 2, -sprite_size * sprite_scale]
    });

    var galleryIndex = gallery.add({
        src: options.photoUrl || 'http://placehold.it/1280x1024',
        title: name,
        date: new Date(),
        href: 'http://placehold.it/1280x1024',
        spriteId: spriteId
    });

    placemark.events.add('click', function () {
        placemark.hint.hide($.noop, true);
        gallery.go(galleryIndex);
    });

    return placemark;
}

module.exports = character;
