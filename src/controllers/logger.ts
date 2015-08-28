'use strict';

import loggerService = require('./../services/winstonLogger');
import express = require('express');

/**
 * Log endpoints
 */
module Controllers.Logger {

  /*
   * Proxies log call to the respective logging endpoint
   */
  export function store(req: express.Request, res: express.Response) {

    try {
      const winstonLogger = loggerService.getGroupLogger(req.params.endpoint),
        payload = req.body.message,
        level = req.body.level;

      console.log('logging!');
      winstonLogger.log(level, payload);
    } catch (error) {
      res.status(404);
    }

    res.end();
  }

};

export = Controllers.Logger;
