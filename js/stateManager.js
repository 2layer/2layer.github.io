var $body = $('.body');

var AVAILABLE_STATES = ['body_state_map', 'body_state_content', 'body_state_gallery'].join(' ');

function activate(what) {
    $body.removeClass(AVAILABLE_STATES).addClass('body_state_' + what);
}

exports.activate = activate;
