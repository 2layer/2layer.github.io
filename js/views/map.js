/**
 * @module mapView
 */

var ymaps = require('ymaps'),
    config = require('config'),
    Backbone = require('backbone'),
    _ = require('_'),
    router = require('router');

var sprite_size = config.character.sprite_size,
    sprite_scale = config.character.sprite_scale,
    sprite_url = config.character.sprite_url;

/**
 * @class
 * @extends Backbone.View
 */
var Map = Backbone.View.extend(/** @lends module:mapView~Map# */{
    /**
     *
     * @param {Object}              options
     * @param {Backbone.Collection} options.monsters
     */
    initialize: function (options) {
        this.monsters = options.monsters;
        this.map = new ymaps.Map(this.el, config.mapState, config.mapOptions);

        this._createGeoObjectsCollections();
        this._addEvents();
    },

    _createGeoObjectsCollections: function () {
        _.each(['monstersGeoObjects', 'charactersGeoObjects'], function (collectionName) {
            this[collectionName] = new ymaps.GeoObjectCollection();
            this.map.geoObjects.add(this[collectionName]);
        }, this);
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

        this.charactersGeoObjects.add(placemark);
        this._fitCharactersInViewPort();
    },

    _fitCharactersInViewPort: _.debounce(function () {
        this.map.setBounds(this.charactersGeoObjects.getBounds());
    }, 5),

    _addMonster: function (options) {
        var image = options.image;
        var placemark = new ymaps.Placemark(options.location, {}, {
            iconImageHref: image.url,
            iconImageSize: [image.width * image.scale, image.height * image.scale],
            iconImageOffset: [-image.width * image.scale / 2, -image.height * image.scale]
        });

        this.monstersGeoObjects.add(placemark);
    }
});

module.exports = Map;
