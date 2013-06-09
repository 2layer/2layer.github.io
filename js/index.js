var characters = new (require('charactersCollection'))(),
    monsters = new (require('monstersCollection'))();

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
map.on('characterClick', function (id) {
    gallery.showById(id);
});

var Online = require('onlineView');
var online = new Online({
    el: '.online',
    collection: characters
});
online.on('characterClick', function (id) {
    gallery.showById(id);
});

var Content = require('contentView');
var content = new Content({
    el: 'body'
});

monsters.fetch();
characters.fetch();

