'use strict';

var express = require('express'),
    router = express.Router(),
    settingsController = require('./../controllers/settings');

/**
 * Retrieve logger public settings
 */
router.get('/settings', settingsController.get);

module.exports = router;
