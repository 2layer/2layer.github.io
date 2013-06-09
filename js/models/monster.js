var Backbone = require('backbone'),
    config = require('config');

var id = 0;
var Monster = Backbone.Model.extend({
    defaults: function () {
        return {
            id: ++id,
            image: {}
        };
    }
});

module.exports = Monster;

