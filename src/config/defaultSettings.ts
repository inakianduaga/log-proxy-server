/// <reference path="./../../typings/node/node.d.ts" />

'use strict';

module Config.DefaultSettings {

  // enum RsyslogProtocol { U, T }
  // enum HipchatMessageFormat { html }
  // enum RequestLogLevel {silly, debug, verbose, info, warn, error}

  interface ISettings {
    transports: Array<IGenericTransport>;
    defaultRequestLogLevel: string;
  };

  interface IGenericTransport {
    name: string,
    enabled: boolean,
    settings: any
  };

  interface IRsyslogTransport extends IGenericTransport {
    settings: {
      host: string,
      port: number,
      hostname: string,
      facility: number, // Facility index (default 0, valid values are from 0 to 23)
      protocol: string, // TCP or UDP (values can be "U" or "T", default is "U")
      tag: string, // A tag to name the application for easy log filtering (default is 'winston')
      level: string
    }
  };

  interface IHipchatTransport extends IGenericTransport {
    settings: {
      token: string,
      room: string,
      from: string, // 15 chars max
      level?: string,
      notify?: boolean,
      color?: string,
      messageFormat?: string
    }
  };

  /**
   * Default settings for the logger
   */
  export const settings: ISettings = {
    transports: [
      {
        name: 'rsyslog',
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
      {
        name: 'hipchat',
        enabled:  false,
        settings: {
          // Required parameters
          token:         process.env.HIPCHAT_TOKEN,
          room:          '',
          from:          'log-server', // 15 chars max
          // Optional parameters
          level:         '',
          notify:        false,
          color:         'yellow',
          messageFormat: 'html'
        }
      }
    ],
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
