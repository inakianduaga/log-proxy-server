'use strict';

import winstonLoggerService = require('./../services/winstonLogger'),
import settingsService = require('./../services/settings');

/**
 * Log endpoints
 */
module Controllers.Logger {

  /*
   * Proxies log call to the respective logging endpoint
   */
  export function store(req, res) {

    const winstonLogger = winstonLoggerService.getLogger(),
        payload = req.body,
        level = settingsService.getRequestLogLevel();

    winstonLogger.log(level, payload);

    res.end();
  }


};

export = Controllers.Logger;
