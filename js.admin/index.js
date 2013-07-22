/**
 * @module index
 */

var _ = require('_');
_.extend(require('abstractCollection').prototype, require('saveableCollection'));

var characters = new (require('charactersCollection'))(),
    monsters = new (require('monstersCollection'))(),
    Backbone = require('backbone');

var Gallery = require('galleryView');
var gallery = new Gallery({
    el: '.js-gallery-layer',
    collection: characters
});

var MapEditable = require('mapEditableView');
var map = new MapEditable({
    el: '#map',
    collection: characters,
    monsters: monsters
});

var Online = require('onlineView');
var online = new Online({
    el: '.online',
    collection: characters
});

$('.content').addClass('content_mode_admin');

monsters.fetch();
characters.fetch();

// Запускаем в самом конце,
// чтобы объекты успели подписаться на события роутера
Backbone.history.start();
