/**
 * @module monsterModel
 */

var Backbone = require('backbone'),
    config = require('config');

var id = 0;

/**
 * @class
 * @extends Backbone.Model
 */
var Monster = Backbone.Model.extend(/** @lends module:monsterModel~Monster# */{
    /**
     * @return {Object}
     */
    defaults: function () {
        return {
            id: ++id,
            image: {}
        };
    }
});

module.exports = Monster;

