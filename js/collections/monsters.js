var AbstractCollection = require('abstractCollection'),
    Monster = require('monsterModel');

var Monsters = AbstractCollection.extend({
    url: '/data/monsters.geojson',
    model: Monster
});

module.exports = Monsters;

