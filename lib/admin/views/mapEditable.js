/**
 * @module mapView
 */

var MapView = require('mapView'),
    ModalView = require('modalView'),
    _ = require('_'),
    config = require('config');

/**
 * @class
 * @extends MapView
 */
var MapEditable = MapView.extend(/** @lends module:mapEditable~MapEditable# */{
    initialize: function () {
        MapView.prototype.initialize.apply(this, arguments);
        var self = this;

        this.map.events.add('click', function (e) {
            var data = {
                location: e.get('coordPosition'),
                date: new Date().toString(),
                name: Math.random().toString(16),
                class_id: 0 | Math.random() * config.charactersCount,
                photo_small: config.character.default_photo,
                photo_url: config.character.default_photo
            };

            self.promptCharacterInfo(data).then(function (data) {
                self.collection.add(data);
                self.collection.save();
            });
        });
    },

    promptCharacterInfo: function (data) {
        return new ModalView({
            data: data
        });
    }
});

module.exports = MapEditable;
