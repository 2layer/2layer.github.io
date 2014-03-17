###*
 * @module monsterModel
###

Backbone = require 'backbone'
config = require 'config'

id = 0

###*
 * @class
 * @extends Backbone.Model
###
Monster = Backbone.Model.extend
    defaults: ->
      id: ++id,
      image: {}

module.exports = Monster
