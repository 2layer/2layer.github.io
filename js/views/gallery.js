var stateManager = require('stateManager');

/**
 *
 * @param {String|jQuery|HTMLElement} el
 * @constructor
 */
function Gallery(el) {
    var self = this;

    this.$el = $(el);
    this.$image = this.$el.find('.gallery__image');
    this.$date = this.$el.find('.gallery__date');
    this.$link = this.$el.find('.gallery__link');

    this.items = [];
    this.index = 0;

    this.$image.click(function (e) {
        var $image = $(this),
            posX = $image.position().left,
            percentage = (e.pageX - posX) / $image.width();

        if (percentage < 0.2) {
            self.prev();
        } else {
            self.next();
        }
    });
}

Gallery.prototype.add = function (options) {
    this.items.push(options);

    return this.items.length - 1;
};

Gallery.prototype._updateGallery = function (options) {
    this.show();
    this.$image.attr('src', options.src);
    this.$date.text(options.date);
    this.$link.text(options.title).attr('href', options.href);
};

Gallery.prototype.go = function (index) {
    if (this.items.length <= index || index < 0) {
        return;
    }

    this._updateGallery(this.items[index]);
};

Gallery.prototype.next = function () {
    this.index++;
    if (this.index > this.items.length -1) {
        this.index = 0;
    }

    this.go(this.index);
};

Gallery.prototype.prev = function () {
    this.index--;
    if (this.index < 0) {
        this.index = this.items.length -1;
    }

    this.go(this.index);
};

Gallery.prototype.show = function () {
    stateManager.activate('gallery');

    return this;
};

Gallery.prototype.hide = function () {
    stateManager.activate('map');

    return this;
};

var instance;

/**
 *
 * @param {String|jQuery|HTMLElement} el
 * @return {Gallery}
 */
module.exports = function (el) {
    if (instance) {
        return instance;
    }

    if (!el) {
        throw new Error('Activate gallery before use: require("gallery")(".gallery")');
    }

    instance = new Gallery(el);

    return instance;
};
