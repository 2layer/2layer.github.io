var Backbone = require('backbone'),
    router = require('router'),
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

        this.index = 0;

        this._bindEvents();
    },

    _bindEvents: function () {
        router.on('route:showGallery', function go(index) {
            if (!this.collection.length) {
                return;
            }
            this.go(index - 1);
        }, this);

        // Случай если url - gallery, а данных еще нет
        router.once('route:showGallery', function rememberThenGo(index) {
            if (this.collection.length) {
                return;
            }

            this.collection.once('sync', function () {
                this.go(index - 1);
            }, this);
        }, this);
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
            // Закрываем окно если нет объекта
            router.navigate('', {trigger: true});
            return;
        }

        this.index = index;
        this.render(this.collection.at(index));
    },

    _navigate: function (index) {
        router.navigate('gallery/' + (index + 1), {trigger: true});
    },

    /**
     * @param {Number} id character id
     */
    showById: function (id) {
        var model = this.collection.get(id),
            index = this.collection.indexOf(model);

        this._navigate(index);
    },

    next: function () {
        this.index++;
        if (this.index > this.collection.length -1) {
            this.index = 0;
        }

        this._navigate(this.index);
    },

    prev: function () {
        this.index--;
        if (this.index < 0) {
            this.index = this.collection.length -1;
        }

        this._navigate(this.index);
    }
});

module.exports = Gallery;
