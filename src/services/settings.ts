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

  export function generateGroupsList(): string[] {
    const names = [];
    config.groupSettings.forEach( group => names.push[group.name]);
    return names;
  }

  export function getFullGroupsSettings(group: string): config.IFullGroupSettings {
    return _.merge(config.baseSettings, getGroupSpecificSettings(group));
  }

  function getGroupSpecificSettings(group: string): config.IGroupSettings {
    return config.groupSettings.filter((value: config.IGroupSettings) => value === group).shift;
  }

}

export = Services.Settings;
