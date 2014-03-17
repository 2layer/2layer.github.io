###*
 * @module characterModel
###

Backbone = require 'backbone'
lang = require 'lang'
config = require 'config'
moment = require(if lang is 'ru' then 'moment-ru' else 'moment')

id = 0

###*
 * @class
 * @extends Backbone.Model
###
Character = Backbone.Model.extend

  defaults: ->
    id: ++id
    name: Math.random().toString 16
    class_id: 0 | Math.random() * config.charactersCount
    photo_small: config.character.default_photo
    photo_url: config.character.default_photo
    date: new Date()

  ###*
   * @return {Boolean}
  ###
  isNewbie: ->
    moment().diff(@get('date'), 'days') < config.newbie_days

  ###*
   * @return {String}
  ###
  dateCalendar: ->
    moment @get 'date'
    .calendar()

  ###*
   * @return {String}
  ###
  timeOnline: ->
    dateDiff = moment @get 'date'
    .diff()

    moment.duration dateDiff
    .humanize()

module.exports = Character
