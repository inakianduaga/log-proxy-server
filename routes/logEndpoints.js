'use strict';

var express = require('express'),
    router = express.Router(),
    logController = require('./../controllers/logger');

/**
 * Main log routes
 */
router.post('/log', logController.store);

module.exports = router;
