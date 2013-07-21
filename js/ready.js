/**
 * @module ready
 */

var lang = require('lang'),
    config = require('config'),
    ymapsApi = config.ymapsApi.replace('%lang', lang);

var maps = $.getScript(ymapsApi).pipe(function () {
    var dfd = $.Deferred();
    window.ymaps.ready(dfd.resolve);
    return dfd.promise();
});

var ready = $.Deferred();
$(ready.resolve);

module.exports = $.when(maps, ready.promise());
