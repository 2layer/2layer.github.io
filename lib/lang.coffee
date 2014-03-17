###*
 * @module lang
###

availableLanguages = ['en', 'ru']
navigatorLanguage = navigator.language or navigator.browserLanguage or ''
lang = navigatorLanguage.match(/^[a-z]{2}/)?[0]

lang = availableLanguages[0] if lang in availableLanguages

module.exports = lang
