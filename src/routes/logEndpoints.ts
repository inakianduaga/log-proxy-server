import express = require('express');
import logController = require('./../controllers/logger');

module Routes.LogEndpoints {

  export const router = express.Router();

  router.post('/log', logController.store);
}

export = Routes.LogEndpoints;
