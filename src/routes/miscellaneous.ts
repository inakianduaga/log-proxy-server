'use strict';

import express = require('express');
import miscController = require('./../controllers/miscellaneous');
const router = express.Router();

router.get('/', miscController.healthCheck);

export = router;
