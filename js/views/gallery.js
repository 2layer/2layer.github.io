var _ = require('_'),
    Backbone = require('backbone'),
    router = require('router'),
    lang = require('lang');

var Gallery = Backbone.View.extend({
    template: _.template(require('galleryTemplate')),

    events: {
        'click .gallery__image': 'changeImage'
    },

    initialize: function () {
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
        var $image = $(e.target),
            posX = $image.position().left,
            percentage = (e.pageX - posX) / $image.width();

        if (percentage < 0.2) {
            this.prev();
        } else {
            this.next();
        }
    },

    render: function (model) {
        var attributes = model.attributes;

        var options = {
            src: attributes.photo_small,
            classId: attributes.class_id,
            name: attributes.name,
            href: attributes.photo_url,
            isNewbie: model.isNewbie(),
            timeOnline: model.timeOnline()
        };

        this.$el.html(this.template(options));
        this._initShareButton(options);
    },

    _initShareButton: function (data) {
        if (!window.Ya || !Ya.share) {
            return;
        }

        this.$el.find('.share__buttons').each(function () {
            var $el = $(this);
            Ya.share({
                element: $el[0],
                theme: $el.attr('data-yashareTheme'),
                l10n: $el.attr('data-yashareL10n'),
                image: $el.attr('data-yashareImage'),
                link: $el.attr('data-yashareLink'),
                title: $el.attr('data-yashareTitle'),
                description: $el.attr('data-yashareDescription'),
                elementStyle: {
                    type: $el.attr('data-yashareType'),
                    quickServices: $el.attr('data-yashareQuickServices').split(',')
                }
            });
        });
        return false;
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
