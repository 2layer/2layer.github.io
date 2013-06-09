var _ = require('_'),
    lang = require('lang'),
    config = require('config'),
    Backbone = require('backbone');

var Online = Backbone.View.extend({
    events: {
        'click .online__item': 'characterClick'
    },

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

    render: function (model) {
        this.$el.append(this._renderModel(model));
    },

    characterClick: function (e) {
        this.trigger('characterClick', e.currentTarget.id);

        return false;
    }
});

module.exports = Online;
