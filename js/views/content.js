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
