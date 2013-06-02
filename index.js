// This file was automatically generated from "index.lmd.json"
(function(global,main,modules,modules_options,options){var initialized_modules={},global_eval=function(code){return global.Function("return "+code)()},global_document=global.document,local_undefined,register_module=function(moduleName,module){var output={exports:{}};initialized_modules[moduleName]=1;modules[moduleName]=output.exports;if(!module){module=module||global[moduleName]}else if(typeof module==="function"){var module_require=lmd_require;if(modules_options[moduleName]&&modules_options[moduleName].sandbox&&typeof module_require==="function"){module_require=local_undefined}module=module(module_require,output.exports,output)||output.exports}module=module;return modules[moduleName]=module},lmd_events={},lmd_trigger=function(event,data,data2,data3){var list=lmd_events[event],result;if(list){for(var i=0,c=list.length;i<c;i++){result=list[i](data,data2,data3)||result;if(result){data=result[0]||data;data2=result[1]||data2;data3=result[2]||data3}}}return result||[data,data2,data3]},lmd_on=function(event,callback){if(!lmd_events[event]){lmd_events[event]=[]}lmd_events[event].push(callback)},lmd_require=function(moduleName){var module=modules[moduleName];var replacement=lmd_trigger(4,moduleName,module);if(replacement){moduleName=replacement[0];module=replacement[1]}if(initialized_modules[moduleName]&&module){return module}if(typeof module==="string"&&module.indexOf("(function(")===0){module=global_eval(module)}return register_module(moduleName,module)},output={exports:{}};for(var moduleName in modules){initialized_modules[moduleName]=0}(function(){function stringify(object){var properties=[];for(var key in object){if(object.hasOwnProperty(key)){properties.push(quote(key)+":"+getValue(object[key]))}}return"{"+properties.join(",")+"}"}function getValue(value){if(typeof value==="string"){return quote(value)}else if(typeof value==="boolean"){return""+value}else if(value.join){if(value.length==0){return"[]"}else{var flat=[];for(var i=0,len=value.length;i<len;i+=1){flat.push(getValue(value[i]))}return"["+flat.join(",")+"]"}}else if(typeof value==="number"){return value}else{return stringify(value)}}function pad(s){return"0000".substr(s.length)+s}function replacer(c){switch(c){case"\b":return"\\b";case"\f":return"\\f";case"\n":return"\\n";case"\r":return"\\r";case"	":return"\\t";case'"':return'\\"';case"\\":return"\\\\";default:return"\\u"+pad(c.charCodeAt(0).toString(16))}}function quote(s){return'"'+s.replace(/[\u0000-\u001f"\\\u007f-\uffff]/g,replacer)+'"'}function indexOf(item){for(var i=this.length;i-->0;){if(this[i]===item){return i}}return-1}})();(function(){function is_shortcut(moduleName,moduleContent){return!initialized_modules[moduleName]&&typeof moduleContent==="string"&&moduleContent.charAt(0)=="@"}function rewrite_shortcut(moduleName,module){if(is_shortcut(moduleName,module)){moduleName=module.replace("@","");var newModule=modules[moduleName];module=newModule===module?local_undefined:newModule}return[moduleName,module]}lmd_on(4,rewrite_shortcut);})();main(lmd_require,output.exports,output)})
(this,(function (require, exports, module) { /* wrapped by builder */
require('ready').pipe(function () {
    require('galleryView')('.gallery');
    require('mapView')('#map');
    require('contentView')('body');
});

}),{
"ymaps": "@ymaps",
"config": (function (require, exports, module) { /* wrapped by builder */
var config = {
    character: {
        sprite_size: 64,
        sprite_scale: 0.5,
        sprite_url: "images/characters.png"
    }
};

module.exports = config;

}),
"ready": (function (require, exports, module) { /* wrapped by builder */
var dfd = $.Deferred(),
    dfd2 = $.Deferred(),
    ymaps = window.ymaps;

ymaps.ready(dfd.resolve);
$(dfd2.resolve);

module.exports = $.when(dfd.promise(), dfd2.promise());

}),
"stateManager": (function (require, exports, module) { /* wrapped by builder */
var $body = $('.body');

var AVAILABLE_STATES = ['body_state_map', 'body_state_content', 'body_state_gallery'].join(' ');

function activate(what) {
    $body.removeClass(AVAILABLE_STATES).addClass('body_state_' + what);
}

exports.activate = activate;

}),
"characterView": (function (require, exports, module) { /* wrapped by builder */
var ymaps = require('ymaps'),
    gallery = require('galleryView')(),
    config = require('config').character;

var sprite_size = config.sprite_size,
    sprite_scale = config.sprite_scale,
    sprite_url = config.sprite_url;

/**
 *
 * @param {Object} options
 * @param {Array}  options.location
 * @param {String} options.name
 * @param {String} options.photoUrl
 *
 * @return {ymaps.Placemark}
 */
function character(options) {
    var spriteId = options.spriteId,
        name = options.name || Math.random();

    var placemark = new ymaps.Placemark(options.location, {
        hintContent: name
    }, {
        iconImageHref: sprite_url,
        iconImageSize: [sprite_size * sprite_scale, sprite_size * sprite_scale],
        iconImageClipRect: [[spriteId * sprite_size, 0], [(spriteId + 1) * sprite_size, sprite_size]],
        iconImageOffset: [-sprite_size * sprite_scale / 2, -sprite_size * sprite_scale]
    });

    var galleryIndex = gallery.add({
        src: options.photoUrl || 'http://placehold.it/1280x1024',
        title: name,
        date: new Date(),
        href: 'http://placehold.it/1280x1024'
    });

    placemark.events.add('click', function () {
        placemark.hint.hide($.noop, true);
        gallery.go(galleryIndex);
    });

    return placemark;
}

module.exports = character;

}),
"contentView": (function (require, exports, module) { /* wrapped by builder */
var stateManager = require('stateManager');

/**
 *
 * @param {String|jQuery|HTMLElement} el
 *
 * @return {jQuery}
 */
function content(el) {
    var $el = $(el);

    var $body = $el.find('.body'),
        $articles = $body.find('.article'),
        $gallery = $body.find('.gallery'),
        $logo = $el.find('.logo'),
        $menuLinks = $el.find('.js-about-button,.js-photos-button');

    $body.find('.body__content,.body__gallery').add($logo).click(function () {
        stateManager.activate('map');
    });

    $articles.add($gallery).click(function () {
        return false;
    });

    $menuLinks.click(function () {
        var $link = $(this),
            target = $link.attr('href').replace('#', ''),
            $currentArticle = $articles.filter('.js-' + target + '-article');

        if ($currentArticle.is(':visible')) {
            stateManager.activate('map');
        } else {
            stateManager.activate('content');
            $articles.hide();
            $currentArticle.show();
        }

        return false;
    });

    return $el;
}

module.exports = content;

}),
"galleryView": (function (require, exports, module) { /* wrapped by builder */
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


}),
"mapView": (function (require, exports, module) { /* wrapped by builder */
var ymaps = require('ymaps'),
    character = require('characterView');

var geolocation = ymaps.geolocation,
    coords = [geolocation.latitude, geolocation.longitude];

/**
 *
 * @param {String|jQuery|HTMLElement} el
 * @return {ymaps.Map}
 */
function map(el) {
    el = $(el || '#map')[0];
    var map = new ymaps.Map(el, {
        center: coords,
        zoom: 14,
        type: 'yandex#satellite' || 'yandex#hybrid',
        behaviors: ['default', 'scrollZoom']
    });

    map.controls.add('zoomControl', {
        left: 5,
        top: 5
    });

    map.events.add('click', function (e) {
        var coords = e.get('coordPosition');

        var char = character({
            spriteId: 0 | Math.random() * 9,
            location: coords
        });

        map.geoObjects.add(char);
    });

    return map;
}

module.exports = map;

})
},{},{});
