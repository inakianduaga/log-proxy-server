'use strict';

var express = require('express'),
    router = express.Router(),
    logController = require('./../controllers/logger');

router.post('/log', logController.store);

module.exports = router;
