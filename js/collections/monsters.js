/**
 * @module monstersCollection
 */

var AbstractCollection = require('abstractCollection'),
    Monster = require('monsterModel');

/**
 * @class
 * @extends AbstractCollection
 */
var Monsters = AbstractCollection.extend(/** @lends module:monstersCollection~Monsters# */{
    /**
     * @type {String}
     */
    url: 'data/monsters.geojson',
    /**
     * @type {Monster}
     */
    model: Monster
});

module.exports = Monsters;

