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

module.exports.setLang = (req, res, next) => {
  const locale = req.cookies.lang || i18n.getLocale();
    i18n.setLocale(locale);
    next();
};