###*
 * @module monstersCollection
###

AbstractCollection = require 'abstractCollection'
Monster = require 'monsterModel'

###*
 * @class
 * @extends AbstractCollection
###
Monsters = AbstractCollection.extend
  url: 'data/monsters.geojson'
  model: Monster

module.exports = Monsters
