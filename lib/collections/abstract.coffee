###*
 * @module abstractCollection
###

Backbone = require 'backbone'
_ = require '_'

###*
 * @class
 * @extends Backbone.Collection
###
AbstractCollection = Backbone.Collection.extend
  ###*
   * Parses GeoJSON format
   *
   * @see http://www.geojson.org/
   * @param {Object} data
   * @return {Object} internal object format
  ###
  parse: (data) ->
    _.map data.features, (feature) ->
      _.extend feature.properties, location: feature.geometry.coordinates

  ###*
   * Restores GeoJSON format
   *
   * @see http://www.geojson.org/
   * @return {Object}
  ###
  toJSON: ->
    features = @map (model) ->
      data = model.toJSON()

      type: 'Feature'
      geometry:
        type: 'Point'
        coordinates: data.location
      properties: _.omit data, 'location'

    type: 'FeatureCollection'
    features: features

module.exports = AbstractCollection
