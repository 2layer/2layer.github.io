###*
 * @module saveableCollection saveable mixin
###

_ = require '_'
fs = require 'fs'

module.exports
  save: ->
    data = JSON.stringify @toJSON(), null, 4
    file = _.result this, 'url'

    fs.writeFileSync file, data
