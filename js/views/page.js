/**
 * @module galleyView
 */

var Backbone = require('backbone'),
    router = require('router'),
    Disqus = require('disqusView');

/**
 * @class
 * @extends Backbone.View
 */
var Page = Backbone.View.extend(/** @lends module:pageView~Page# */{
    initialize: function (options) {
        router.on('route:showPage', function (name) {
            if (options.name !== name) {
                return;
            }
            this._initDisqus();
        }, this);
    },

    _initDisqus: function () {
        new Disqus({
            el: this.$el.find('.disqus')
        });
    }
});

module.exports = Page;
