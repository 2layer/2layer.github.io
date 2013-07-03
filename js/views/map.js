var ymaps = require('ymaps'),
    config = require('config'),
    Backbone = require('backbone'),
    router = require('router');

var sprite_size = config.character.sprite_size,
    sprite_scale = config.character.sprite_scale,
    sprite_url = config.character.sprite_url;

var Map = Backbone.View.extend({
    /**
     *
     * @param {Object}              options
     * @param {Backbone.Collection} options.monsters
     */
    initialize: function (options) {
        var self = this;

        this.monsters = options.monsters;
        this.map = new ymaps.Map(this.el, config.mapState, config.mapOptions);

        this.map.events.add('click', function (e) {
            self.collection.add({
                location: e.get('coordPosition')
            });
        });

        this._addEvents();
    },

    _addEvents: function () {
        this.collection.on('add', function (model) {
            this._addCharacter(model.toJSON());
        }, this);

        this.monsters.on('add', function (model) {
            this._addMonster(model.toJSON());
        }, this);
    },

    _addCharacter: function (options) {
        var class_id = options.class_id,
            name = options.name;

        var placemark = new ymaps.Placemark(options.location, {
            hintContent: name
        }, {
            iconImageHref: sprite_url,
            iconImageSize: [sprite_size * sprite_scale, sprite_size * sprite_scale],
            iconImageClipRect: [[class_id * sprite_size, 0], [(class_id + 1) * sprite_size, sprite_size]],
            iconImageOffset: [-sprite_size * sprite_scale / 2, -sprite_size * sprite_scale]
        });

        placemark.events.add('click', function () {
            placemark.hint.hide($.noop, true);
            router.navigate('gallery/' + options.id, {trigger: true});
        });

        this.map.geoObjects.add(placemark);
    },

    _addMonster: function (options) {
        var image = options.image;
        var placemark = new ymaps.Placemark(options.location, {}, {
            iconImageHref: image.url,
            iconImageSize: [image.width * image.scale, image.height * image.scale],
            iconImageOffset: [-image.width * image.scale / 2, -image.height * image.scale]
        });

        this.map.geoObjects.add(placemark);
    }
});

module.exports = Map;
