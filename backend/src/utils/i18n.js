const i18n = require('i18n');

i18n.configure({
    locales: ['en', 'es'],
    directory: __dirname + '/locales',
    defaultLocale: 'es',
    objectNotation: true,
    queryParameter: 'lang',
    register: global
});

module.exports = i18n;