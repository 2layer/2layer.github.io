###*
 * @module index
###

_ = require '_'

_.extend require('abstractCollection')::, require 'saveableCollection'

characters = new (require 'charactersCollection')()
monsters = new (require 'monstersCollection')()
Backbone = require 'backbone'

Gallery = require 'galleryView'
gallery = new Gallery
  el: '.js-gallery-layer'
  collection: characters

MapEditable = require 'mapEditableView'
map = new MapEditable
  el: '#map'
  collection: characters
  monsters: monsters

Online = require 'onlineView'
online = new Online
  el: '.online'
  collection: characters

$ '.content'
.addClass 'content_mode_admin'

monsters.fetch()
characters.fetch()

# Запускаем в самом конце,
# чтобы объекты успели подписаться на события роутера
Backbone.history.start()
