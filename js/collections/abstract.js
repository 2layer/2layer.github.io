/**
 * @module abstractCollection
 */

var Backbone = require('backbone'),
    _ = require('_');

/**
 * @class
 * @extends Backbone.Collection
 */
var AbstractCollection = Backbone.Collection.extend(/** @lends module:abstractCollection~AbstractCollection# */{
    /**
     * Parses GeoJSON format
     *
     * @see http://www.geojson.org/
     * @param {Object} data
     * @return {Object} internal object format
     */
    parse: function (data) {
        return _.map(data.features, function (feature) {
            return _.extend(feature.properties, {
                location: feature.geometry.coordinates
            });
        });
    },

    /**
     * Restore GeoJSON format
     *
     * @see http://www.geojson.org/
     * @return {Object}
     */
    toJSON: function () {
        var features = this.map(function (model) {
            var data = model.toJSON();

            return {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": data.location
                },
                "properties": _.omit(data, 'location')
            };
        });

        return {
            "type": "FeatureCollection",
            "features": features
        };
    }
});

module.exports = AbstractCollection;
