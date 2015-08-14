'use strict';

//-- A service for instantiating winston loggers w/ attached transports based on detected settings

import winston = require('winston');

module Services.WinstonLogger {

  let
    transports = {
      hipchat : require('winston-hipchat').Hipchat,
      rsyslog : require('winston-rsyslog').Rsyslog
    },
    settingsService = require('./settings'),
    loggerInstance;

  /**
   * Registers winston transports on a winston logger instance
   *
   * @param logger a winston logger instance
   * @param req
   * @param res
   * @param next
   *
   * @returns {Object} a winston logger
   */
  function registerTransports(logger) {

    let settings = settingsService.getSettings();

    //Register every transport that is enabled, with the transport settings
    for (let transport in transports) {
      if (transports.hasOwnProperty(transport)) {

        if(settings.transports[transport].enabled) {
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
  export function instantiateNewLogger(req, res, next) {

    loggerInstance = new (winston.Logger)();
    registerTransports(loggerInstance);

    return next();
  };

  /**
   * Returns the current logger instance
   *
   * @returns {Object}
   */
  export function getLogger() {
    console.log(loggerInstance);
    return loggerInstance;
  };

}

export = Services.WinstonLogger;

