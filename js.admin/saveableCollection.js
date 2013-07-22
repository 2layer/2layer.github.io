/**
 * @module saveableCollection saveable mixin
 */

var _ = require('_'),
    fs = require('fs');

module.exports = {
    save: function () {
        var data = JSON.stringify(this.toJSON(), null, 4),
            file = _.result(this, 'url');

        fs.writeFileSync(file, data);
    }
};
