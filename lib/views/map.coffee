###*
 * @module mapView
###

ymaps = require 'ymaps'
config = require 'config'
Backbone = require 'backbone'
_ = require '_'
router = require 'router'

{sprite_size, sprite_scale, sprite_url} = config.character

###*
 * @class
 * @extends Backbone.View
###
Map = Backbone.View.extend
  ###*
   * @param {Object}              options
   * @param {Backbone.Collection} options.monsters
  ###
  initialize: ({@monsters}) ->
    @map = new ymaps.Map @el, config.mapState, config.mapOptions

    @_createGeoObjectsCollections()
    @_addEvents()
    return

  _createGeoObjectsCollections: ->
    for collectionName in ['monstersGeoObjects', 'charactersGeoObjects']
      @[collectionName] = new ymaps.GeoObjectCollection()
      @map.geoObjects.add @[collectionName]
    return

  _addEvents: ->
    @collection.on 'add', (model) =>
      @_addCharacter model.toJSON()

    @monsters.on 'add', (model) =>
      @_addMonster model.toJSON()

  _addCharacter: ({class_id, name, location, id}) ->
    properties =
      hintContent: name

    options =
      iconImageHref: sprite_url
      iconImageSize: [sprite_size * sprite_scale, sprite_size * sprite_scale]
      iconImageClipRect: [[class_id * sprite_size, 0], [(class_id + 1) * sprite_size, sprite_size]]
      iconImageOffset: [-sprite_size * sprite_scale / 2, -sprite_size * sprite_scale]

    placemark = new ymaps.Placemark location, properties, options

    placemark.events.add 'click', ->
      placemark.hint.hide $.noop, true
      router.navigate "gallery/#{id}", trigger: true
      return

    @charactersGeoObjects.add placemark
    @_fitCharactersInViewPort()

  _fitCharactersInViewPort: _.debounce( ->
    @map.setBounds @charactersGeoObjects.getBounds()
  , 5),

  _addMonster: ({image}) ->
    options =
      iconImageHref: image.url,
      iconImageSize: [image.width * image.scale, image.height * image.scale],
      iconImageOffset: [-image.width * image.scale / 2, -image.height * image.scale]

    placemark = new ymaps.Placemark options.location, {}, options

    @monstersGeoObjects.add(placemark)

module.exports = Map
