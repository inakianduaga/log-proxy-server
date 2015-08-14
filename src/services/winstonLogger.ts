/// <reference path="./../../typings/tsd.d.ts" />
// A service for instantiating winston loggers w/ attached transports based on detected settings

'use strict';

import winston = require('winston');
import express = require('express');
import settingsService = require('./settings');

module Services.WinstonLogger {

  let
    transports = {
      hipchat : require('winston-hipchat').Hipchat,
      rsyslog : require('winston-rsyslog').Rsyslog
    },
    settings = settingsService.getSettings(),
    loggerInstance: winston.LoggerInstance;

  /**
   * Registers winston transports on a winston logger instance
   */
  function registerTransports(logger: winston.LoggerInstance): winston.LoggerInstance {

    // Register every transport that is enabled, with the transport settings
    for (let transport in transports) {
      if (transports.hasOwnProperty(transport)) {

        if (settings.transports[transport].enabled) {
          logger.add(transports[transport], settings.transports[transport].settings);
        }

      }
    }

    return logger;
  };

  /**
   * Middleware for generating a new Winston logger instance
   *
   * @param req
   * @param res
   * @param next
   */
  export function instantiateNewLogger(req: express.Request, res: express.Response, next) {

    loggerInstance = new (winston.Logger)();
    registerTransports(loggerInstance);

    return next();
  };

  /**
   * Returns the current logger instance
   */
  export function getLogger(): winston.LoggerInstance {
    console.log(loggerInstance);
    return loggerInstance;
  };

}

export = Services.WinstonLogger;

