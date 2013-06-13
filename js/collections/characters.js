var AbstractCollection = require('abstractCollection'),
    Character = require('characterModel');

var Characters = AbstractCollection.extend({
    url: '/data/characters.geojson',
    model: Character
});

module.exports = Characters;

