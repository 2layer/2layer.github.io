/**
 * @module index
 */

var lang = require('lang'),
    characters = new (require('charactersCollection'))(),
    monsters = new (require('monstersCollection'))(),
    Backbone = require('backbone');

var Gallery = require('galleryView');
var gallery = new Gallery({
    el: '.js-gallery-layer',
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

var Page = require('pageView');
var page = new Page({
    el: '.js-about-page:lang(' + lang + ')',
    name: 'about'
});

monsters.fetch();
characters.fetch();

// Запускаем в самом конце,
// чтобы объекты успели подписаться на события роутера
Backbone.history.start();
