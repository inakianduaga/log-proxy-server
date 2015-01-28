'use strict';

//-- Middleware for registering / configuring winston transports based on detected settings

var winston = require('winston'),
    transports = {
      hipchat : require('winston-hipchat').Hipchat,
      rsyslog : require('winston-rsyslog').Rsyslog
    },
    settingsService = require('./settings');

/**
 * Registers winston transports
 *
 * @param req
 * @param res
 * @param next
 */
var register = function(req, res, next) {

  var settings = settingsService.getSettings();

  //Register every transport that is enabled, with the transport settings
  for (var transport in transports) {
    if (transports.hasOwnProperty(transport)) {

      if(settings.transports[transport].enabled) {
        winston.add(transports[transport], settings.transports[transport].settings);
      }

    }
  }

  return next();
};

module.exports = {
  registerTransportsMiddleware : register
};

