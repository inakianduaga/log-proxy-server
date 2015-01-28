'use strict';

//-- Logger settings middleware
//-- Builds the logging configuration based on default settings & request settings

var _ = require('lodash'),
    defaults = require('../config/defaultSettings'),
    requestHeaderSettingsField = defaults.settings.settingsRequestHeaderField,
    settings;


/**
 * A function to take a string written in dot notation style, and use it to
 * delete a nested object property inside of an object.
 *
 * @link https://gist.github.com/jasonrhodes/2321581
 *
 * @param String nested A dot notation style parameter reference (ie "urls.small")
 * @param Object object (optional) The object to search
 *
 * @return {Boolean}
 */
function deleteProperty( propertyName, object ) {
  var parts = propertyName.split( '.' ),
      length = parts.length,
      i,
      property = object || this;

  for ( i = 0; i < length; i++ ) {

    //No matches, bail out
    if (! (parts[i] in property)) {
      return false;
    }

    //Delete when on last key
    if(i == length - 1) {
      delete property[parts[i]];

      return true;
    }

    //Set and continue to next step
    property = property[parts[i]];
  }

  return property;
}

/**
 * Builds the logger settings based on defaults and optional request settings header
 *
 * @todo: REMOVE PRIVATE SETTINGS FROM HEADER REQUEST SETTINGS SINCE CLIENT SHOULDN'T BE ABLE TO MODIFY THAT
 * @param req
 * @param res
 * @param next
 */
var parseRequestSettings = function(req, res, next) {

  var requestSettings = req.get(requestHeaderSettingsField) ? JSON.parse(req.get(requestHeaderSettingsField)) : {};

  settings = _.merge(defaults.settings, requestSettings);

  return next();
};

/**
 * Return the logger settings
 * @returns {Object}
 */
var getSettings = function() {
  return settings;
};

/**
 * Returns the settings ommiting private keys
 */
var getPublicSettings = function() {

  var publicSettings = _.cloneDeep(settings);

  //Remove private keys
  defaults.privateSettingsKeysList.forEach(function(value) {
    deleteProperty(value, publicSettings);
  });

  return publicSettings;
};

module.exports = {
  parseRequestSettings : parseRequestSettings,
  getSettings : getSettings,
  getPublicSettings : getPublicSettings
};

