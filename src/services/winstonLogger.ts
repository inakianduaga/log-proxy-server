/// <reference path="./../../typings/tsd.d.ts" />
// A service for instantiating winston loggers w/ attached transports based on detected settings

'use strict';

import winston = require('winston');
import express = require('express');
import settingsService = require('./settings');
import config = require('../config/config');

module Services.WinstonLogger {

  let
    availableTransports = {
      hipchat: require('winston-hipchat').Hipchat,
      rsyslog: require('winston-rsyslog').Rsyslog
    };

  /**
   * Middleware for registering a winston logger instance for each of the groups defined in config
   */
  export function instantiateLoggers(req: express.Request, res: express.Response, next: Function) {
    settingsService.generateGroupsList()
      .map(group => settingsService.getFullGroupsSettings(group))
      .forEach(fullGroupSettings => {
        fullGroupSettings.transports
          .filter(transport => transport.enabled)
          .forEach(transport => winston.loggers.add(availableTransports[transport.name], transport.settings))
      });

    next();
  }

  export function getGroupLogger(group: string): winston.LoggerInstance {
    if (!winston.loggers.has(group)) {
      throw new Error('invalid group');
    }

    return winston.loggers.get(group);
  }

  // /**
  //  * Add transport to a logger based on given settings
  //  */
  // function registerGroupTransports(logger: winston.LoggerInstance, transports: Array<config.IGenericTransport>) {
  //   transports
  //     .filter(transport => transport.enabled)
  //     .forEach(transport => logger.add(availableTransports[transport.name], transport.settings));
  // }

}

export = Services.WinstonLogger;

