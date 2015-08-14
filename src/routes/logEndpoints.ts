'use strict';

import express = require('express');
import logController = require('./../controllers/logger');
const router = express.Router();

router.post('/log', logController.store);

export = router;
