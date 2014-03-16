###*
 * @module onlineView
###

_ = require '_'
lang = require 'lang'
config = require 'config'
Backbone = require 'backbone'

###*
 * @class
 * @extends Backbone.View
###
Online = Backbone.View.extend
  template: _.template require 'online__itemTemplate'

  initialize: ->
    @_addEvents()
    return

  _addEvents: ->
    @collection.on 'sync', =>
      @renderAll()
      @collection.on 'add', this.render, @

  ###*
   * Renders all online characters
  ###
  renderAll: ->
    html = @collection.map (model) =>
      @_renderModel(model)

    @$el
    .empty()
    .html html.join ''

  _renderModel: (model) ->
    attributes = model.toJSON();

    options = _.extend
      is_newbie: model.isNewbie()
      date_calendar: model.dateCalendar()
    , attributes

    @template options

  ###*
   * @param {Character} model
  ###
  render: (model) ->
    @$el.append @_renderModel model

module.exports = Online
