###*
 * @module router
###

Backbone = require 'backbone'
_ = require '_'

AVAILABLE_STATES = 'content_state_map content_state_page content_state_gallery'

hashBangNavigate = _.bind Backbone.history.navigate, Backbone.history

fullHashBangNavigate = (fragment, options) ->
  hashBangNavigate "!#{fragment}", options

Backbone.history.navigate = fullHashBangNavigate

###*
 * @class
 * @extends Backbone.Router
###
Router = Backbone.Router.extend
  routes:
    '!': 'hideAll'
    '!gallery/:id': 'showGallery'
    '!:page': 'showPage'
    '*default': 'redirectToFullHashBang'

  initialize: ->
    @$body = $ '.content'
    @$galleryLayers = @$body.find '.js-gallery-layer'
    @$pageLayer = @$body.find '.js-page-layer'
    @$contentLayers = @$galleryLayers.add @$pageLayer
    @$pages = @$body.find '.page'

    @_bindDefaultEvents()
    return

  _bindDefaultEvents: ->
    @$contentLayers.click (e) =>
      @navigate '', trigger: true if $(e.target).is @$contentLayers

    @$contentLayers.find '>div'
    .click (e) ->
      $ e.target
      .is 'button,a'

    $ window
    .keyup (e) =>
      @navigate '', trigger: true if e.which is 27

  ###*
   * Navigates to specified page
   * @param {String} page
  ###
  showPage: (page) ->
    $currentPage = @$pages.filter ".js-#{page}-page"

    if $currentPage.is ':visible'
      @_activate 'map'
    else
      @_activate 'page'
      @$pages.addClass 'hidden'
      $currentPage.removeClass 'hidden'

  ###*
   * Opens gallery layer
  ###
  showGallery: ->
    @_activate 'gallery'

  ###*
   * Hides all layers
  ###
  hideAll: ->
    @_activate 'map'

  ###*
   * #page -> #!page redirect required by disqus
  ###
  redirectToFullHashBang: ->
    hash = Backbone.history.getHash()

    # Already full hashbang
    return if hash.charAt(0) is '!'

    @navigate hash, trigger: true

  _activate: (what) ->
    @$body.removeClass AVAILABLE_STATES
    .addClass "content_state_#{what}";

    switch what
      when 'page'
        @$galleryLayers.addClass 'hidden'
        @$pageLayer.removeClass 'hidden'
      when 'gallery'
        @$galleryLayers.removeClass 'hidden'
        @$pageLayer.addClass 'hidden'
      else
        @$contentLayers.addClass 'hidden'

module.exports = new Router()
