'use strict';

//-- Logger settings middleware
//-- Builds the logging configuration based on default settings & request settings

var _ = require('lodash'),
    defaults = require('../config/defaultSettings'),
    objectUtils = require('../utils/jsObject'),
    requestHeaderSettingsField = defaults.settings.settingsRequestHeaderField,
    settings,
    requestLogLevel;

/**
 * Builds the logger settings based on defaults and optional request settings header
 *
 * @param req
 * @param res
 * @param next
 */
var parseRequestSettings = function(req, res, next) {

  var requestSettings = req.get(requestHeaderSettingsField) ? JSON.parse(req.get(requestHeaderSettingsField)) : {};

  //Filter out private keys from the request
  objectUtils.removeKeysFromObject(requestSettings, defaults.privateSettingsKeysList);

  settings = _.merge(defaults.settings, requestSettings);

  requestLogLevel = requestSettings.logLevel ? requestSettings.logLevel : defaults.settings.defaultRequestLogLevel;

  return next();
};

/**
 * Returns the log level of the current request based on request configuration / defaults
 *
 * @returns string
 */
var getRequestLogLevel = function() {
  return requestLogLevel;
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

  return objectUtils.removeKeysFromObject(publicSettings, defaults.privateSettingsKeysList);
};

module.exports = {
  parseRequestSettings : parseRequestSettings,
  getSettings : getSettings,
  getPublicSettings : getPublicSettings,
  getRequestLogLevel : getRequestLogLevel
};

