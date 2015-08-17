/// <reference path="./../../typings/node/node.d.ts" />

'use strict';

module Config.GroupsSettings {

  interface IGenericTransportOverride {
    enabled?: boolean;
    settings?: any;
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

  interface IHipchatTransportOverride extends IGenericTransportOverride {
    settings?: {
      token?: string,
      room?: string,
      from?: string, // 15 chars max
    };
  };

  interface IGroupSettings {
    name: string;
    transports: {
      hipchat?: IHipchatTransportOverride,
      rsyslog?: IRsyslogTransportOverride,
    };
  };

  /**
   * Setting groups
   * We can use any of the groups defined above as a log route parameter.
   */
  export const groups: Array<IGroupSettings> = require('./settings.json').groups;

}

export = Config.GroupsSettings;

