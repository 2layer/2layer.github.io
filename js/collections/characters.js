var Backbone = require('backbone'),
    Character = require('characterModel');

var Characters = Backbone.Collection.extend({
    url: '/data/characters.json',
    model: Character
});

module.exports = Characters;

