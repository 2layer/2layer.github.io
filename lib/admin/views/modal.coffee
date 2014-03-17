###*
 * @module modalView
###

_ = require '_'
Backbone = require 'backbone'

###*
 * @class
 * @extends Backbone.View
###
Modal = Backbone.View.extend
  events:
    'click .modal__save': 'save',
    'click .modal__cancel': 'cancel'

  template: _.template require 'modalTemplate'

  initialize: ({data}={}) ->
    @render data or {}

    @_dfd = $.Deferred()

    promise = @_dfd.promise()

    @['then'] = (args...) ->
      promise.then args...
    return

  render: (data) ->
    @setElement @template data
    $ 'body'
    .append @$el

  save: ->
    @remove()
    @_dfd.resolve @serializeForm()
    false

  cancel: ->
    @remove()
    @_dfd.reject()
    false

  serializeForm: ->
    result = {}
    array = @$el.serializeArray()

    $.each array, ->
      if typeof result[@name] isnt 'undefined'
        result[@name] = [result[@name]] if not result[this.name].push?
        result[@name].push @value || ''
      else
        result[@name] = @value or '';

    result.location = result.location.split(',').map Number
    result.class_id = Number result.class_id

    result

module.exports = Modal
