/// <reference path="./../../typings/express/express.d.ts" />
'use strict';

import express = require('express');

module Services.ErrorHandler {

  /**
   * Generates a 500 response
   *
   * @param {Boolean=} includeStackTrace Whether to include a stack trace in the generated response
   */
  let handler = (err: Error, req: express.Request, res: express.Response, next: Function, includeStackTrace: boolean) => {
    res.status(res.statusCode || 500);
    res.render('error', {
      message: err.message,
      error:   includeStackTrace ? err : {}
    });
  };

  /**
   * 500 error development response
   */
  export function development (err: Error, req: express.Request, res: express.Response, next: Function) {
    return handler(err, req, res, next, true);
  };

  /**
   * 500 error production response
   */
  export function production (err: Error, req: express.Request, res: express.Response, next: Function) {
    return handler(err, req, res, next, false);
  };

}

export = Services.ErrorHandler;
