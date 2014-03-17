###*
 * @module charactersCollection
###

AbstractCollection = require 'abstractCollection'
Character = require 'characterModel'

###*
 * @class
 * @extends AbstractCollection
###
Characters = AbstractCollection.extend
  url: 'data/characters.geojson'
  model: Character

module.exports = Characters
