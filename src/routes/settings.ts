'use strict';

import express = require('express');
import settingsController = require('./../controllers/settings');
const router = express.Router();

router.get('/settings', settingsController.get);

export = router;
