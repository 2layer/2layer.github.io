var disqus;

module.exports = function (shortname) {
    disqus = disqus || $.getScript('https://' + shortname + '.disqus.com/embed.js').pipe(function () {
        return window.DISQUS;
    });

    return disqus;
};
