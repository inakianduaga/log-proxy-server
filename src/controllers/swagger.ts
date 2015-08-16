/// <reference path="./../../typings/tsd.d.ts" />

import express = require('express');
import url = require('url');

module Controllers.Swagger {

    /**
     * Returns the public settings used to configure the logger
     */
    export function getSwaggerSpec(req: express.Request, res: express.Response) {
      return res.json(require('../swagger/spec.json'));
    }

    /**
     * If no query param is found on the request, we will set it and redirect back to same page
     */
    export function redirectIfNoQueryParam(req: express.Request, res: express.Response, next: Function) {

      if (!req.query.url) {
        var query = req.query;
        query.url = '/api-docs';
        return res.redirect(301, url.format({query: query}));
      }

      next();
    }

};

export = Controllers.Swagger;
