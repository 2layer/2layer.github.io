var availableLanguages = ['en', 'ru'],
    lang = ((navigator.language || navigator.browserLanguage || '').match(/^[a-z]{2}/) || 0)[0];

if (availableLanguages.indexOf(lang) < 0) {
    lang = availableLanguages[0];
}

module.exports = lang;
