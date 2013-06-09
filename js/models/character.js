var Backbone = require('backbone'),
    lang = require('lang'),
    config = require('config'),
    moment = require(lang === 'ru' ? 'moment-ru' : 'moment');

var Photo = Backbone.RelationalModel.extend({
    defaults: {
        small: '#',
        original: '#'
    }
});

var id = 0;
var Character = Backbone.RelationalModel.extend({
    defaults: function () {
        return {
            id: ++id,
            name: Math.random().toString(16),
            class_id: 0 | Math.random() * 9,
            photo: {},
            date: new Date()
        };
    },
    relations: [{
        type: Backbone.HasOne,
        key: 'photo',
        relatedModel: Photo
    }],

    /**
     * @return {Boolean}
     */
    isNewbie: function () {
        return moment(this.get('date')).diff(new Date(), 'days') < config.newbie_days
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

