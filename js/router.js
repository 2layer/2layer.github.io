var Backbone = require('backbone');

var AVAILABLE_STATES = ['content_state_map', 'content_state_page', 'content_state_gallery'].join(' ');

var Router = Backbone.Router.extend({
    routes: {
        '': 'hideAll',
        'gallery/:id': 'showGallery',
        ':page': 'showPage'
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

        this.$contentLayers.click(function () {
            self.navigate('', {trigger: true});
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

    showGallery: function () {
        this._activate('gallery');
    },

    hideAll: function () {
        this._activate('map');
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
