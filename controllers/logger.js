'use strict';

var winston = require('winston'),
    settingsService = require('./../services/settings');

/**
 * Log endpoints
 */
module.exports = {

  /*
   * Proxies log call to the respective logging endpoint
   */
  store: function (req, res) {

    var payload = req.body,
        level = settingsService.getRequestLogLevel();

    winston.log(level, payload);

    res.end();
  }


};
