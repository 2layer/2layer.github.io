###*
 * @module galleyView
###

_ = require '_'
Backbone = require 'backbone'
router = require 'router'
lang = require 'lang'
Disqus = require 'disqusView'

###*
 * @class
 * @extends Backbone.View
###
Gallery = Backbone.View.extend
  template: _.template require 'galleryTemplate'

  events:
    'click .gallery__image': 'changeImage'

  initialize: ->
    @index = 0;
    @_bindEvents()
    return

  _bindEvents: ->
    router.on 'route:showGallery', (index) =>
      return if not @collection.length
      @go index - 1
      return

    # Случай если url - gallery, а данных еще нет
    router.once 'route:showGallery', (index) =>
      return if this.collection.length

      @collection.once 'sync', =>
        @go index - 1

  ###*
   * @param {Event} e
  ###
  changeImage: (e) ->
    $image = $ e.target
    posX = $image.position().left
    percentage = (e.pageX - posX) / $image.width()

    if percentage < 0.2
      @prev()
    else
      @next()

  ###*
   * @param {Character} model
  ###
  render: (model) ->
    attributes = model.attributes;

    options =
      src: attributes.photo_small,
      classId: attributes.class_id,
      name: attributes.name,
      href: attributes.photo_url,
      isNewbie: model.isNewbie(),
      timeOnline: model.timeOnline()

    @$el.html @template options
    @_initShareButton()
    @_initDisqus()
    return

  _initShareButton: ->
    return if not window.Ya?.share?

    @$el.find '.share__buttons'
    .each ->
      $el = $ @
      window.Ya.share
        element: $el[0]
        theme: $el.attr 'data-yashareTheme'
        l10n: $el.attr 'data-yashareL10n'
        image: $el.attr 'data-yashareImage'
        link: $el.attr 'data-yashareLink'
        title: $el.attr 'data-yashareTitle'
        description: $el.attr 'data-yashareDescription'
        elementStyle:
          type: $el.attr 'data-yashareType'
          quickServices: $el.attr('data-yashareQuickServices').split ','
    return

  _initDisqus: ->
    new Disqus
      el: @$el.find '.disqus'

  ###*
   * Navigate to character index
   * @param {Number} index
  ###
  go: (@index) ->
    if @collection.length <= @index or @index < 0
      # Закрываем окно если нет объекта
      router.navigate '', trigger: true
      return

    # Check in case of bad index
    character = @collection.at index
    @render character if character

  _pageUrl: (index) -> "gallery/#{index + 1}"

  _navigate: (index) ->
    router.navigate @_pageUrl(index), trigger: true

  ###
   * @param {Number} id character id
  ###
  showById: (id) ->
    model = @collection.get id
    index = @collection.indexOf model

    @_navigate index

  ###
   * Next character
  ###
  next: ->
    @index++;
    this.index = 0 if this.index > this.collection.length - 1

    @_navigate @index

  ###*
   * Prev character
  ###
  prev: ->
    @index--;
    @index = @collection.length - 1 if @index < 0

    @_navigate @index

module.exports = Gallery
