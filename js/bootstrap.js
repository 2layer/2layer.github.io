// localize app
$('html').attr('lang', require('lang'));

// launch
require('ready').pipe(function () {
    require('index');
});
