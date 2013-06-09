var Backbone = require('backbone'),
    stateManager = require('stateManager');

var Content = Backbone.View.extend({
    events: {
        'click .js-about-button,.js-online-button': 'showContent'
    },

    initialize: function () {
        this.$pages = this.$el.find('.page');
    },

    showContent: function (e) {
        var $link = $(e.target),
            target = $link.attr('href').replace('#', ''),
            $currentPage = this.$pages.filter('.js-' + target + '-page');

        if ($currentPage.is(':visible')) {
            stateManager.activate('map');
        } else {
            stateManager.activate('page');
            this.$pages.addClass('hidden');
            $currentPage.removeClass('hidden');
        }

        return false;
    }
});

module.exports = Content;
