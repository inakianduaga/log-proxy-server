/// <reference path="./../../typings/node/node.d.ts" />

import settingsLoader = require('./loader');

module Configuration {

  // enum RsyslogProtocol { U, T }
  // enum HipchatMessageFormat { html }
  // enum RequestLogLevel {silly, debug, verbose, info, warn, error}

  export interface IGenericTransport {
    name: string;
    enabled: boolean;
    settings: any;
  };

  export interface IGenericTransportOverride {
    name: string;
    enabled?: boolean;
    settings?: any;
  };

  export interface IRsyslogTransport extends IGenericTransport {
    settings: {
      host: string,
      port: number,
      hostname: string,
      facility: number, // Facility index (default 0, valid values are from 0 to 23)
      protocol: string, // TCP or UDP (values can be "U" or "T", default is "U")
      tag: string, // A tag to name the application for easy log filtering (default is 'winston')
      level: string
    };
  };

  interface IRsyslogTransportOverride extends IGenericTransportOverride {
    settings?: {
      host?: string,
      port?: number,
      hostname?: string,
      facility?: number, // Facility index (default 0, valid values are from 0 to 23)
      protocol?: string, // TCP or UDP (values can be "U" or "T", default is "U")
      tag?: string, // A tag to name the application for easy log filtering (default is 'winston')
      level?: string
    };
  };

  export interface IHipchatTransport extends IGenericTransport {
    settings: {
      token: string,
      room: string,
      from: string, // 15 chars max
      level?: string,
      notify?: boolean,
      color?: string,
      messageFormat?: string
    };
  };

  interface IHipchatTransportOverride extends IGenericTransportOverride {
    settings?: {
      token?: string,
      room?: string,
      from?: string, // 15 chars max
    };
  };

  export interface IBaseSettings {
    transports: IGenericTransport[];
    logLevel: string;
  };

  export interface IGroupSettings {
    name: string;
    transports?: IGenericTransportOverride[];
    logLevel?: string;
  };

  export interface IFullGroupSettings extends IBaseSettings {
    name: string;
  }

  export const groupSettings: Array<IGroupSettings> = settingsLoader.load().groups;

  export const baseSettings: IBaseSettings = settingsLoader.load().baseSettings;

  /**
   * List the settings that are not public and won't be ever be exposed to the clients
   */
  export const privateSettingsKeysList = [
    'transports.rsyslog.settings.host',
    'transports.rsyslog.settings.port',
    'transports.hipchat.settings.token',
  ];
}

export = Configuration;
