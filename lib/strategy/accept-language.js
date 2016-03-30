var acceptLanguage = require('negotiator/lib/language');

/**
 * Stragety =  accept-language
 * This strategy reads the accept-language header from the user request.
 * It uses the great `negotiator` module to determine the best language/locale.
 * Header example: 'en;q=0.8, es, pt'
 *
 */

module.exports = function(options) {
  options = options || {};

  function getLocalesFrom(req) {
    if (!req) return false;

    // if we're preserving the requested locale, we don't pass the list
    // of locales to negotiator.  when we pass that list to negotiator, it will
    // return undefined if no match is found and then we've lost the original string
    var locales = undefined;
    if (!options.preserveRequested) locales = options.locales;
    var preferredLocales = acceptLanguage(req.headers['accept-language'], locales);
    return preferredLocales;
  }

  return {
    name: 'accept-language',

    /**
     * accept-language specific function that returns the sorted accepted languages for the user request.
     * @param {Object} req    connect / express request object
     * @returns {Array}       sorted accepted languages array
     */
    getLocalesFrom: getLocalesFrom,

    /**
     * gets the locale from the given strategy
     *
     * @param {Object} req              connect / express request object
     * @param {Array} locales           locale definition Array.
     * @return {Object|String|false}    Object: if it was previously stored, String: if the locale was found with the given Strategy, Boolean:false otherwise.
     */
    getLocaleFrom: function getLocaleFrom(req, locales) {
      if (!req) return false;
      var preferredLocales = getLocalesFrom(req);
      return preferredLocales && preferredLocales[0];
    },

    /**
     * Stores the locale to the given strategy.
     * Note: not all strategies have to implement this. Most likely this is suitable for cookie or session strategy.
     *
     * @param {Object} req      connect / express request object
     * @param {Object} res      connect / express response object
     * @param {Object} locale   the locale Object with the Keys: ['locales', 'locale', 'requestedLocale', 'isPreferredLocale', 'isSubLocale', 'isAcceptLocale', 'isDefaultLocale']
     * @return {Boolean}        true if stored sucessfully, otherwise false
     */
    storeLocaleTo: function storeLocaleTo(req, res, locale) {
      console.error('i18n accept-language strategy. function storeLocaleTo not implemented');
    }

  };
};


