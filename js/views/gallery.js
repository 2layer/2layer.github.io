var Backbone = require('backbone'),
    stateManager = require('stateManager'),
    lang = require('lang');

var Gallery = Backbone.View.extend({
    events: {
        'click .gallery__image': 'changeImage'
    },

    initialize: function () {
        this.$image = this.$el.find('.gallery__image');
        this.$date = this.$el.find('.gallery__date-placeholder');
        this.$link = this.$el.find('.gallery__link');
        this.$character = this.$el.find('.icon');

        this.index = this.collection.length - 1;
    },

    changeImage: function (e) {
        var posX = this.$image.position().left,
            percentage = (e.pageX - posX) / this.$image.width();

        if (percentage < 0.2) {
            this.prev();
        } else {
            this.next();
        }
    },

    render: function (model) {
        var attributes = model.attributes,
            timeOnline = model.timeOnline(),
            src = attributes.photo.small,
            href = attributes.photo.original;

        this.show();
        this.$image.attr('src', src);
        this.$date.text(timeOnline);
        this.$link.text(attributes.name).attr('href', href);

        this.$character
            .removeClass()
            .addClass('icon icon_margin_yes icon_id_' + attributes.class_id);

        if (model.isNewbie()) {
            this.$character.addClass('icon_newbie_yes');
        }
    },

    go: function (index) {
        if (this.collection.length <= index || index < 0) {
            return;
        }

        this.render(this.collection.at(index));
    },

    /**
     * @param {Number} id character id
     */
    showById: function (id) {
        var model = this.collection.get(id);
        this.index = this.collection.indexOf(model);
        this.go(this.index);
    },

    next: function () {
        this.index++;
        if (this.index > this.collection.length -1) {
            this.index = 0;
        }

        this.go(this.index);
    },

    prev: function () {
        this.index--;
        if (this.index < 0) {
            this.index = this.collection.length -1;
        }

        this.go(this.index);
    },

    show: function () {
        stateManager.activate('gallery');
    },

    hide: function () {
        stateManager.activate('map');
    }
});

module.exports = Gallery;
