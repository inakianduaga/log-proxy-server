/// <reference path="./../../typings/tsd.d.ts" />

'use strict';

// Logger settings middleware
// Builds the logging configuration based on default settings & request settings

import express = require('express');
import _ = require('lodash');
import config = require('../config/config');
import objectUtils = require('../utils/object');

module Services.Settings {

  let
    // requestHeaderSettingsField = defaults.settings.settingsRequestHeaderField, TODO: THIS IS NOW REPLACED BY A SETTINGS ID PARAMETER!
    settings,
    requestLogLevel: string;

  /**
   * The list of all groups
   */
  export function generateGroupsList(): string[] {
    const names = [];
    config.groupSettings.forEach( group => names.push[group.name]);
    return names;
  }

  /**
   * Builds the logger settings based on defaults and optional request settings header
   */
  export function parseRequestSettings(req: express.Request, res: express.Response, next: Function) {

    // TODO: HERE WE NEED TO GET THE REQUEST PARAMETER ON THE LOG ROUTE
    let requestSettings = req.get(requestHeaderSettingsField) ? JSON.parse(req.get(requestHeaderSettingsField)) : {};

    // Filter out private keys from the request
    objectUtils.removeKeysFromObject(requestSettings, defaults.privateSettingsKeysList);

    settings = _.merge(defaults.settings, requestSettings);

    requestLogLevel = requestSettings.logLevel ? requestSettings.logLevel : defaults.settings.defaultRequestLogLevel;

    return next();
  };

  /**
   * Returns the log level of the current request based on request configuration / defaults
   */
  export function getRequestLogLevel(): string {
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
