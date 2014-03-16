/**
 * @module modalView
 */

var _ = require('_'),
    Backbone = require('backbone');

/**
 * @class
 * @extends Backbone.View
 */
var Modal = Backbone.View.extend(/** @lends module:modalView~Modal# */{
    events: {
        'click .modal__save': 'save',
        'click .modal__cancel': 'cancel'
    },
    /**
     * @type {Function}
     */
    template: _.template(require('modalTemplate')),

    /**
     *
     * @param {Object} options
     * @param {Object} options.data
     */
    initialize: function (options) {
        options = options || {};
        this.render(options.data || {});

        this._dfd = $.Deferred();

        var promise = this._dfd.promise();
        this.then = function () {
            promise.then.apply(promise, arguments);
        };
    },

    render: function (data) {
        this.setElement(this.template(data));
        $('body').append(this.$el);
    },

    save: function () {
        this.remove();
        this._dfd.resolve(this.serializeForm());
        return false;
    },

    cancel: function () {
        this.remove();
        this._dfd.reject();
        return false;
    },

    serializeForm: function() {
        var result = {},
            array = this.$el.serializeArray();

        $.each(array, function() {
            if (typeof result[this.name] !== 'undefined') {
                if (!result[this.name].push) {
                    result[this.name] = [result[this.name]];
                }
                result[this.name].push(this.value || '');
            } else {
                result[this.name] = this.value || '';
            }
        });

        result.location = result.location.split(',').map(Number);
        result.class_id = +result.class_id;
        return result;
    }
});

module.exports = Modal;
