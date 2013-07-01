var Backbone = require('backbone'),
    lang = require('lang'),
    config = require('config'),
    moment = require(lang === 'ru' ? 'moment-ru' : 'moment');

var id = 0;
var Character = Backbone.Model.extend({
    defaults: function () {
        return {
            id: ++id,
            name: Math.random().toString(16),
            class_id: 0 | Math.random() * config.charactersCount,
            photo: {},
            date: new Date()
        };
    },

    /**
     * @return {Boolean}
     */
    isNewbie: function () {
        return moment().diff(this.get('date'), 'days') < config.newbie_days
    },

    /**
     * @return {String}
     */
    dateCalendar: function () {
        return moment(this.get('date')).calendar();
    },

    /**
     * @return {String}
     */
    timeOnline: function () {
        return moment.duration(moment(this.get('date')).diff()).humanize();
    }
});

module.exports = Character;

