'use strict';

var express = require('express'),
    router = express.Router(),
    logController = require('./../controllers/logController');

router.post('/log', logController.store);

module.exports = router;
