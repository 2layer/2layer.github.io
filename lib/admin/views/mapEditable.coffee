###*
 * @module mapView
###

MapView = require 'mapView'
ModalView = require 'modalView'
_ = require '_'
config = require 'config'

###*
 * @class
 * @extends MapView
###
MapEditable = MapView.extend
  initialize: (args...)->
    MapView::initialize.apply this, args

    @map.events.add 'click', (e) =>
      data =
        location: e.get 'coordPosition'
        date: new Date().toString()
        name: Math.random().toString(16)
        class_id: 0 | Math.random() * config.charactersCount
        photo_small: config.character.default_photo
        photo_url: config.character.default_photo

      @promptCharacterInfo data
      .then (data) =>
        @.collection.add(data)
        @.collection.save()

  promptCharacterInfo: (data) ->
    new ModalView
      data: data

module.exports = MapEditable
