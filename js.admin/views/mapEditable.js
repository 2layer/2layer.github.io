/**
 * @module mapView
 */

var MapView = require('mapView');

/**
 * @class
 * @extends MapView
 */
var MapEditable = MapView.extend(/** @lends module:mapEditable~MapEditable# */{
    initialize: function () {
        MapView.prototype.initialize.apply(this, arguments);
        var self = this;

        this.map.events.add('click', function (e) {
            self.collection.add({
                location: e.get('coordPosition')
            });
            self.collection.save();
        });
    }
});

module.exports = MapEditable;
