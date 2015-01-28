'use strict';

var settings = require('../services/settings');

/**
 * Miscellaneous controller
 */
module.exports = {

    /*
     * Returns the public settings used to configure the logger
     */
    get: function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(settings.getPublicSettings()));
    }

};
