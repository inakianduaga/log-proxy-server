import express = require('express');
import logController = require('./../controllers/logger');

module Routes.LogEndpoints {

  export const router = express.Router();

  router.post('/log/:endpoint', logController.store);
}

export = Routes.LogEndpoints;
