'use strict';

var express = require('express'),
    router = express.Router(),
    miscController = require('./../controllers/miscellaneous');

router.get('/', miscController.healthCheck);

module.exports = router;
