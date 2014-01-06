/**
 * @module onlineView
 */

var _ = require('_'),
    lang = require('lang'),
    disqus = require('disqus'),
    config = require('config').disqus,
    Backbone = require('backbone');

/**
 * @class
 * @extends Backbone.View
 */
var Disqus = Backbone.View.extend({
    /**
     * @type {Function}
     */
    template: _.template(require('disqusTemplate')),

    initialize: function () {
        this.setElement(this.template());
    },

    /**
     *
     * @param {Object} options
     * @param {String} [options.identifier]
     * @param {String} [options.url]
     * @param {String} [options.title]
     * @param {String} [options.language]
     * @returns {Promise}
     */
    reset: function (options) {
        console.log(35);
        return disqus(config.shortname).pipe(function (disqus) {
            disqus.reset({
                reload: true,
                config: function () {
                    this.page.identifier = options.identifier || window.location.hash;
                    this.page.url = options.url || window.location;
                    this.page.title = options.title || document.title;
                    this.page.shortname = config.shortname;
                    this.language = options.language || lang;
                }
            });
        });
    }
});

var disqusView = new Disqus();

/**
 * Mock Backbone View
 *
 * @param {Object} options
 * @param {Object} options.el
 * @returns {Disqus}
 */
function DisqusSinglenton(options) {
    var $hostEl = $(options.el),
        data = $hostEl.data();

    // Remove from old container & add to new one
    disqusView.$el.appendTo($hostEl);

    // Reset
    disqusView.reset(data);

    return disqusView;
}

module.exports = DisqusSinglenton;
