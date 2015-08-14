/// <reference path="./../../typings/tsd.d.ts" />

'use strict';

import settings = require('../services/settings');

/**
 * Miscellaneous controller
 */
module Controllers.Settings {

    /*
     * Returns the public settings used to configure the logger
     */
    export function get(req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(settings.getPublicSettings()));
    }

};

export = Controllers.Settings;
