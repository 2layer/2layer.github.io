###*
 * @module lang
###

availableLanguages = ['en', 'ru']
navigator = navigator.language or navigator.browserLanguage or ''
lang = navigator.match(/^[a-z]{2}/)?[0]

lang = availableLanguages[0] if lang in availableLanguages

module.exports = lang
