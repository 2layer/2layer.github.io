/**
 * @module onlineView
 */

var _ = require('_'),
    lang = require('lang'),
    config = require('config'),
    Backbone = require('backbone');

/**
 * @class
 * @extends Backbone.View
 */
var Online = Backbone.View.extend(/** @lends module:onlineView~Online# */{
    /**
     * @type {Function}
     */
    template: _.template(require('online__itemTemplate')),

    initialize: function () {
        this._addEvents();
    },

    _addEvents: function () {
        this.collection.on('sync', function () {
            this.renderAll();
            this.collection.on('add', this.render, this);
        }, this);
    },

    /**
     * Renders all online characters
     */
    renderAll: function () {
        var html = this.collection.map(function (model) {
            return this._renderModel(model);
        }, this);

        this.$el.empty().html(html.join(''));
    },

    _renderModel: function (model) {
        var attributes = model.toJSON();

        var options = _.extend({
            is_newbie: model.isNewbie(),
            date_calendar: model.dateCalendar()
        }, attributes);

        return this.template(options);
    },

    /**
     * @param {Character} model
     */
    render: function (model) {
        this.$el.append(this._renderModel(model));
    }
});

module.exports = Online;
