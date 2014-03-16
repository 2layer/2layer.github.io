###*
 * @module ready
###

lang = require 'lang'
config = require 'config'
ymapsApi = config.ymapsApi.replace '%lang', lang

maps = $.getScript ymapsApi
.pipe ->
  dfd = $.Deferred();
  window.ymaps.ready dfd.resolve
  dfd.promise()

ready = $.Deferred()
$ ready.resolve

module.exports = $.when maps, ready.promise()
