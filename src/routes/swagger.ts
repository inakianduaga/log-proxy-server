'use strict';

import express = require('express');
import path = require('path');
import swaggerController = require('./../controllers/swagger');

const router = express.Router();

router.get('/api-docs', swaggerController.getSwaggerSpec);
router.get('/docs', swaggerController.redirectIfNoQueryParam);
router.use('/docs', express.static(path.join(__dirname, '../../node_modules/swagger-ui/dist')));

export = router;
