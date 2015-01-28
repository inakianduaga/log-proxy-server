'use strict';

/**
 * Default settings for the logger
 */
exports.settings = {
  transports : {
    rsyslog : {
      enabled : true,
      settings : {
        host: process.env.rsyslogHost,
        port: process.env.rsyslogPort,
        hostname: process.env.hostname,
        facility: 0,   // Facility index (default 0, valid values are from 0 to 23)
        protocol: 'U', // TCP or UDP (values can be "U" or "T", default is "U")
        tag: 'winston' // A tag to name the application for easy log filtering (default is 'winston')
      }
    },
    hipchat : {
      enabled : false
    }
  },
  settingsRequestHeaderField : 'logger-settings'
};


/**
 * List the settings that are not public and won't be ever be exposed to the clients
 */
exports.privateSettingsKeysList = [
  'transports.rsyslog.settings.host',
  'transports.rsyslog.settings.port',
];