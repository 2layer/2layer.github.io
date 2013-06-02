var dfd = $.Deferred(),
    dfd2 = $.Deferred(),
    ymaps = window.ymaps;

ymaps.ready(dfd.resolve);
$(dfd2.resolve);

module.exports = $.when(dfd.promise(), dfd2.promise());
