/**
 * @module charactersCollection
 */

var AbstractCollection = require('abstractCollection'),
    Character = require('characterModel');

/**
 * @class
 * @extends AbstractCollection
 */
var Characters = AbstractCollection.extend(/** @lends module:charactersCollection~Characters# */{
    /**
     * @type {String}
     */
    url: '/data/characters.geojson',
    /**
     * @type {Character}
     */
    model: Character
});

module.exports = Characters;

