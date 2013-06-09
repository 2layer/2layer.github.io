var Backbone = require('backbone'),
    Monster = require('monsterModel');

var Monsters = Backbone.Collection.extend({
    url: '/data/monsters.json',
    model: Monster
});

module.exports = Monsters;

