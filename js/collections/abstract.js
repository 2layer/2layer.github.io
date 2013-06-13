var Backbone = require('backbone'),
    _ = require('_');

var AbstractCollection = Backbone.Collection.extend({
    // Parse GeoJSON format
    parse: function (data) {
        return _.map(data.features, function (feature) {
            return _.extend(feature.properties, {
                location: feature.geometry.coordinates
            });
        });
    },

    // Restore GeoJSON format
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
