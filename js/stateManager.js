var $body = $('.content'),
    $galleryLayers = $body.find('.js-gallery-layer'),
    $pageLayer = $body.find('.js-page-layer'),
    $contentLayers = $galleryLayers.add($pageLayer),
    $okButtons = $body.find('.button_ok');

var AVAILABLE_STATES = ['content_state_map', 'content_state_page', 'content_state_gallery'].join(' ');

function activate(what) {
    $body.removeClass(AVAILABLE_STATES).addClass('content_state_' + what);

    switch (what) {
        case 'map':
            $contentLayers.addClass('hidden');
            break;
        case 'page':
            $galleryLayers.addClass('hidden');
            $pageLayer.removeClass('hidden');
            break;
        default:
            $galleryLayers.removeClass('hidden');
            $pageLayer.addClass('hidden');
            break;
    }
}

$contentLayers.add($okButtons).click(function () {
    activate('map');
});

$contentLayers.find('>div').click(function () {
    return false;
});

$(window).keyup(function (e) {
    if (e.which === 27) {
        activate('map');
    }
});

exports.activate = activate;
