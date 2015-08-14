'use strict';

//-- Logger settings middleware
//-- Builds the logging configuration based on default settings & request settings

import _ = require('lodash');

module Services.Settings {

  let
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
  export function parseRequestSettings(req, res, next) {

    //HERE WE NEED TO GET THE REQUEST PARAMETER ON THE LOG ROUTE
    let requestSettings = req.get(requestHeaderSettingsField) ? JSON.parse(req.get(requestHeaderSettingsField)) : {};

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
  export function getRequestLogLevel() {
    return requestLogLevel;
  };

  /**
   * Return the logger settings
   * @returns {Object}
   */
  export function getSettings() {
    return settings;
  };

  /**
   * Returns the settings ommiting private keys
   */
  export function getPublicSettings() {

    let publicSettings = _.cloneDeep(settings);

    return objectUtils.removeKeysFromObject(publicSettings, defaults.privateSettingsKeysList);
  };

}

export = Services.Settings;

