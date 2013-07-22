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
        MapView.prototype.initialize.call(this);
        var self = this;

        this.map.events.add('click', function (e) {
            self.collection.add({
                location: e.get('coordPosition')
            });
        });
    }
});

module.exports = MapEditable;
