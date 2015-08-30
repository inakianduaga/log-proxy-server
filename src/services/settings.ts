/// <reference path="./../../typings/tsd.d.ts" />

'use strict';

// Logger settings middleware
// Builds the logging configuration based on default settings & request settings

import _ = require('lodash');
import config = require('../config/config');

module Services.Settings {

  export function generateGroupsList(): string[] {
    return config.groupSettings.map(group => group.name);
  }

  export function getFullGroupsSettings(group: string): config.IFullGroupSettings {
    const groupSpecificSettings = getGroupSpecificSettings(group),
      baseSettings = config.baseSettings;

    return {
      name: groupSpecificSettings.name,
      transports: mergeTransportsWithMatchingOverrides(baseSettings.transports, groupSpecificSettings.transports)
    };
  }

  function getGroupSpecificSettings(groupId: string): config.IGroupSettings {
    return config.groupSettings.filter(group => group.name === groupId)[0];
  }

  function mergeTransportsWithMatchingOverrides(
    transports: config.IGenericTransport[], overrides: config.IGenericTransportOverride[]): config.IGenericTransport[] {
    return transports.reduce((mergedTransports, transport) => {
      const potentialOverride = overrides.filter(override => override.name === transport.name)[0];

      if (potentialOverride) {
        mergedTransports.push(_.merge(transport, potentialOverride));
      } else {
        mergedTransports.push(transport);
      }

      return mergedTransports;
    }, []);
  }

}

export = Services.Settings;
