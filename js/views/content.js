var stateManager = require('stateManager');

/**
 *
 * @param {String|jQuery|HTMLElement} el
 *
 * @return {jQuery}
 */
function content(el) {
    var $el = $(el);

    var $pages = $el.find('.page'),
        $pageLinks = $el.find('.js-about-button,.js-online-button');

    $pageLinks.click(function () {
        var $link = $(this),
            target = $link.attr('href').replace('#', ''),
            $currentPage = $pages.filter('.js-' + target + '-page');

        if ($currentPage.is(':visible')) {
            stateManager.activate('map');
        } else {
            stateManager.activate('page');
            $pages.addClass('hidden');
            $currentPage.removeClass('hidden');
        }

        return false;
    });

    return $el;
}

module.exports = content;
