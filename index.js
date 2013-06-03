(function(e,t,n,r,i){var s={},o=function(t){return e.Function("return "+t)()},u=e.document,a,f=function(t,i){var o={exports:{}};s[t]=1,n[t]=o.exports;if(!i)i=i||e[t];else if(typeof i=="function"){var u=p;r[t]&&r[t].sandbox&&typeof u=="function"&&(u=a),i=i(u,o.exports,o)||o.exports}return i=i,n[t]=i},l={},c=function(e,t,n,r){var i=l[e],s;if(i)for(var o=0,u=i.length;o<u;o++)s=i[o](t,n,r)||s,s&&(t=s[0]||t,n=s[1]||n,r=s[2]||r);return s||[t,n,r]},h=function(e,t){l[e]||(l[e]=[]),l[e].push(t)},p=function(e){var t=n[e],r=c(4,e,t);return r&&(e=r[0],t=r[1]),s[e]&&t?t:(typeof t=="string"&&t.indexOf("(function(")===0&&(t=o(t)),f(e,t))},d={exports:{}};for(var v in n)s[v]=0;(function(){function e(e){var n=[];for(var r in e)e.hasOwnProperty(r)&&n.push(i(r)+":"+t(e[r]));return"{"+n.join(",")+"}"}function t(n){if(typeof n=="string")return i(n);if(typeof n=="boolean")return""+n;if(n.join){if(n.length==0)return"[]";var r=[];for(var s=0,o=n.length;s<o;s+=1)r.push(t(n[s]));return"["+r.join(",")+"]"}return typeof n=="number"?n:e(n)}function n(e){return"0000".substr(e.length)+e}function r(e){switch(e){case"\b":return"\\b";case"\f":return"\\f";case"\n":return"\\n";case"\r":return"\\r";case"	":return"\\t";case'"':return'\\"';case"\\":return"\\\\";default:return"\\u"+n(e.charCodeAt(0).toString(16))}}function i(e){return'"'+e.replace(/[\u0000-\u001f"\\\u007f-\uffff]/g,r)+'"'}function s(e){for(var t=this.length;t-->0;)if(this[t]===e)return t;return-1}})(),function(){function e(e,t){return!s[e]&&typeof t=="string"&&t.charAt(0)=="@"}function t(t,r){if(e(t,r)){t=r.replace("@","");var i=n[t];r=i===r?a:i}return[t,r]}h(4,t)}(),t(p,d.exports,d)})(this,function(e,t,n){e("ready").pipe(function(){e("galleryView")(".gallery"),e("mapView")("#map"),e("contentView")("body")})},{ymaps:"@ymaps",config:function(e,t,n){var r={character:{sprite_size:64,sprite_scale:.5,sprite_url:"/images/characters.png"}};n.exports=r},ready:function(e,t,n){var r=$.Deferred(),i=$.Deferred(),s=window.ymaps;s.ready(r.resolve),$(i.resolve),n.exports=$.when(r.promise(),i.promise())},stateManager:function(e,t,n){function r(e){i.removeClass(s).addClass("body_state_"+e)}var i=$(".body"),s=["body_state_map","body_state_content","body_state_gallery"].join(" ");t.activate=r},characterView:function(e,t,n){function r(e){var t=e.spriteId,n=e.name||Math.random(),r=new i.Placemark(e.location,{hintContent:n},{iconImageHref:f,iconImageSize:[u*a,u*a],iconImageClipRect:[[t*u,0],[(t+1)*u,u]],iconImageOffset:[-u*a/2,-u*a]}),o=s.add({src:e.photoUrl||"http://placehold.it/1280x1024",title:n,date:new Date,href:"http://placehold.it/1280x1024"});return r.events.add("click",function(){r.hint.hide($.noop,!0),s.go(o)}),r}var i=e("ymaps"),s=e("galleryView")(),o=e("config").character,u=o.sprite_size,a=o.sprite_scale,f=o.sprite_url;n.exports=r},contentView:function(e,t,n){function r(e){var t=$(e),n=t.find(".body"),r=n.find(".article"),s=n.find(".gallery"),o=t.find(".logo"),u=t.find(".js-about-button,.js-photos-button");return n.find(".body__content,.body__gallery").add(o).click(function(){i.activate("map")}),r.add(s).click(function(){return!1}),u.click(function(){var e=$(this),t=e.attr("href").replace("#",""),n=r.filter(".js-"+t+"-article");return n.is(":visible")?i.activate("map"):(i.activate("content"),r.hide(),n.show()),!1}),t}var i=e("stateManager");n.exports=r},galleryView:function(e,t,n){function r(e){var t=this;this.$el=$(e),this.$image=this.$el.find(".gallery__image"),this.$date=this.$el.find(".gallery__date"),this.$link=this.$el.find(".gallery__link"),this.items=[],this.index=0,this.$image.click(function(e){var n=$(this),r=n.position().left,i=(e.pageX-r)/n.width();i<.2?t.prev():t.next()})}var i=e("stateManager");r.prototype.add=function(e){return this.items.push(e),this.items.length-1},r.prototype._updateGallery=function(e){this.show(),this.$image.attr("src",e.src),this.$date.text(e.date),this.$link.text(e.title).attr("href",e.href)},r.prototype.go=function(e){if(this.items.length<=e||e<0)return;this._updateGallery(this.items[e])},r.prototype.next=function(){this.index++,this.index>this.items.length-1&&(this.index=0),this.go(this.index)},r.prototype.prev=function(){this.index--,this.index<0&&(this.index=this.items.length-1),this.go(this.index)},r.prototype.show=function(){return i.activate("gallery"),this},r.prototype.hide=function(){return i.activate("map"),this};var s;n.exports=function(e){if(s)return s;if(!e)throw new Error('Activate gallery before use: require("gallery")(".gallery")');return s=new r(e),s}},mapView:function(e,t,n){function r(e){e=$(e||"#map")[0];var t=new i.Map(e,{center:u,zoom:14,type:"yandex#satellite",behaviors:["default","scrollZoom"]});return t.controls.add("zoomControl",{left:5,top:5}),t.events.add("click",function(e){var n=e.get("coordPosition"),r=s({spriteId:0|Math.random()*9,location:n});t.geoObjects.add(r)}),t}var i=e("ymaps"),s=e("characterView"),o=i.geolocation,u=[o.longitude,o.latitude];n.exports=r}},{},{})