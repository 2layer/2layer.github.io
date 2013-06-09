var Backbone = require('backbone'),
    config = require('config');

var Image = Backbone.RelationalModel.extend({});

var id = 0;
var Monster = Backbone.RelationalModel.extend({
    defaults: function () {
        return {
            id: ++id,
            image: {}
        };
    },
    relations: [{
        type: Backbone.HasOne,
        key: 'image',
        relatedModel: Image
    }]
});

module.exports = Monster;

