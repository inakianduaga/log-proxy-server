'use strict';

import loggerService = require('./../services/winstonLogger');
import settingsService = require('./../services/settings');
import express = require('express');

/**
 * Log endpoints
 */
module Controllers.Logger {

  /*
   * Proxies log call to the respective logging endpoint
   */
  export function store(req: express.Request, res: express.Response) {

    const winstonLogger = loggerService.getGroupLogger(req.query.group),
        payload = req.body,
        level = req.query.log_level;

    winstonLogger.log(level, payload);

    res.end();
  }

};

export = Controllers.Logger;
