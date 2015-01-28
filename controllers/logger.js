'use strict';

var winstonLoggerService = require('./../services/winstonLogger'),
    settingsService = require('./../services/settings');

/**
 * Log endpoints
 */
module.exports = {

  /*
   * Proxies log call to the respective logging endpoint
   */
  store: function (req, res) {

    var winstonLogger = winstonLoggerService.getLogger(),
        payload = req.body,
        level = settingsService.getRequestLogLevel();

    winstonLogger.log(level, payload);

    res.end();
  }


};
