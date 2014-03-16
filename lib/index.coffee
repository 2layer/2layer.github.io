###
  @module index
###

lang = require 'lang'
characters = new (require 'charactersCollection')()
monsters = new (require 'monstersCollection')()
Backbone = require 'backbone'

Gallery = require 'galleryView'
gallery = new Gallery
  el: '.js-gallery-layer'
  collection: characters

Map = require 'mapView'
map = new Map
  el: '#map'
  collection: characters
  monsters: monsters

Online = require 'onlineView'
online = new Online
  el: '.online'
  collection: characters

Page = require 'pageView'
page = new Page
  el: ".js-about-page:lang(#{lang})"
  name: 'about'

monsters.fetch()
characters.fetch()

# Запускаем в самом конце,
# чтобы объекты успели подписаться на события роутера
Backbone.history.start()
