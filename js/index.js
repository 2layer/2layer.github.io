// localize app
$('html').attr('lang', require('lang'));

// launch
require('ready').pipe(function () {
    require('galleryView')('.gallery');
    require('mapView')('#map');
    require('contentView')('body');
});
