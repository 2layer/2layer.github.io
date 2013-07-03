var characters = new (require('charactersCollection'))(),
    monsters = new (require('monstersCollection'))(),
    Backbone = require('backbone');

var Gallery = require('galleryView');
var gallery = new Gallery({
    el: '.gallery',
    collection: characters
});

var Map = require('mapView');
var map = new Map({
    el: '#map',
    collection: characters,
    monsters: monsters
});

var Online = require('onlineView');
var online = new Online({
    el: '.online',
    collection: characters
});

monsters.fetch();
characters.fetch();

// Запускаем в самом конце,
// чтобы объекты успели подписаться на события роутера
Backbone.history.start();
