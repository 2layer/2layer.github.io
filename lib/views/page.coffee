###*
 * @module galleyView
###

Backbone = require 'backbone'
router = require 'router'
Disqus = require 'disqusView'

###
 * @class
 * @extends Backbone.View
###
Page = Backbone.View.extend
  initialize: ({name}) ->
    router.on 'route:showPage', (pageName) =>
      return if name isnt pageName
      @_initDisqus()

  _initDisqus: ->
    new Disqus
      el: @$el.find '.disqus'

module.exports = Page
