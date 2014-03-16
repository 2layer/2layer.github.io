###*
 * @module onlineView
###

_ = require '_'
lang = require 'lang'
disqus = require 'disqus'
config = require('config').disqus
Backbone = require 'backbone'

###*
 * @class
 * @extends Backbone.View
###
Disqus = Backbone.View.extend
  template: _.template require 'disqusTemplate'

  initialize: ->
    @setElement @template()

  ###*
   * @param {Object} options
   * @param {String} [options.identifier]
   * @param {String} [options.url]
   * @param {String} [options.title]
   * @param {String} [options.language]
   * @returns {Promise}
  ###
  reset: (options) ->
    disqus config.shortname
    .pipe (disqus) ->
      disqus.reset
        reload: true,
        config: ->
          @page.identifier = options.identifier or window.location.hash;
          @page.url = options.url or window.location;
          @page.title = options.title or document.title;
          @page.shortname = config.shortname;
          @language = options.language or lang;

disqusView = new Disqus()

###*
 * Mock Backbone View
 *
 * @param {Object} options
 * @param {Object} options.el
 * @returns {Disqus}
###
DisqusSinglenton = (options) ->
  $hostEl = $ options.el
  data = $hostEl.data()

  # Remove from old container & add to new one
  disqusView.$el.appendTo $hostEl

  # Reset
  disqusView.reset data

  return disqusView

module.exports = DisqusSinglenton;
