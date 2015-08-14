/// <reference path="./../../typings/node/node.d.ts" />

'use strict';

module Config.DefaultSettings {

  /**
   * Default settings for the logger
   */
  export const settings = {
    transports:                 {
      rsyslog: {
        enabled:  true,
        settings: {
          host:     process.env.RSYSLOG_HOST,
          port:     process.env.RSYSLOG_PORT,
          hostname: process.env.RSYSLOG_HOSTNAME,
          facility: 0,   // Facility index (default 0, valid values are from 0 to 23)
          protocol: 'U', // TCP or UDP (values can be "U" or "T", default is "U")
          tag:      'winston', // A tag to name the application for easy log filtering (default is 'winston')
          level   : ''
        }
      },
      hipchat: {
        enabled:  false,
        settings: {
          //Required parameters
          token:         process.env.HIPCHAT_TOKEN,
          room:          '',
          from:          'log-server', //15 chars max
          //Optional parameters
          level:         '',
          notify:        false,
          color:         'yellow',
          messageFormat: 'html'
        }
      }
    },
    defaultRequestLogLevel : 'info'
  };

  /**
   * List the settings that are not public and won't be ever be exposed to the clients
   */
  export const privateSettingsKeysList = [
    'transports.rsyslog.settings.host',
    'transports.rsyslog.settings.port',
    'transports.hipchat.settings.token',
  ];
}

export = Config.DefaultSettings;