/**
 * @module router
 */

var Backbone = require('backbone'),
    _ = require('_');

var AVAILABLE_STATES = ['content_state_map', 'content_state_page', 'content_state_gallery'].join(' ');

var hashBangNavigate = _.bind(Backbone.history.navigate, Backbone.history);

function fullHashBangNavigate(fragment, options) {
    return hashBangNavigate('!' + fragment, options);
}

Backbone.history.navigate = fullHashBangNavigate;

/**
 * @class
 * @extends Backbone.Router
 */
var Router = Backbone.Router.extend(/** @lends module:router~Router# */{
    routes: {
        '!': 'hideAll',
        '!gallery/:id': 'showGallery',
        '!:page': 'showPage',
        '*default': 'redirectToFullHashBang'
    },

    initialize: function () {
        this.$body = $('.content');
        this.$galleryLayers = this.$body.find('.js-gallery-layer');
        this.$pageLayer = this.$body.find('.js-page-layer');
        this.$contentLayers = this.$galleryLayers.add(this.$pageLayer);
        this.$pages = this.$body.find('.page');

        this._bindDefaultEvents();
    },

    _bindDefaultEvents: function () {
        var self = this;

        this.$contentLayers.click(function (e) {
            if ($(e.target).is(self.$contentLayers)) {
                self.navigate('', {trigger: true});
            }
        });

        this.$contentLayers.find('>div').click(function (e) {
            return $(e.target).is('button,a');
        });

        $(window).keyup(function (e) {
            if (e.which === 27) {
                self.navigate('', {trigger: true});
            }
        });
    },

    /**
     * Navigates to specified page
     * @param {String} page
     */
    showPage: function (page) {
        var $currentPage = this.$pages.filter('.js-' + page + '-page');

        if ($currentPage.is(':visible')) {
            this._activate('map');
        } else {
            this._activate('page');
            this.$pages.addClass('hidden');
            $currentPage.removeClass('hidden');
        }
    },

    /**
     * Opens gallery layer
     */
    showGallery: function () {
        this._activate('gallery');
    },

    /**
     * Hides all layers
     */
    hideAll: function () {
        this._activate('map');
    },

    /**
     * #page -> #!page redirect required by disqus
     */
    redirectToFullHashBang: function () {
        var hash = Backbone.history.getHash();

        // Already full hashbang
        if (hash.charAt(0) === '!') {
            return;
        }

        this.navigate(hash, {trigger: true});
    },

    _activate: function (what) {
        this.$body.removeClass(AVAILABLE_STATES).addClass('content_state_' + what);

        switch (what) {
            case 'page':
                this.$galleryLayers.addClass('hidden');
                this.$pageLayer.removeClass('hidden');
                break;
            case 'gallery':
                this.$galleryLayers.removeClass('hidden');
                this.$pageLayer.addClass('hidden');
                break;
            case 'map':
            default:
                this.$contentLayers.addClass('hidden');
                break;
        }
    }
});

module.exports = new Router();
