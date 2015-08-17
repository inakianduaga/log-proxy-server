import express = require('express');
import miscController = require('./../controllers/miscellaneous');

module Routes.Miscellaneous {

  export const router = express.Router();

  router.get('/', miscController.healthCheck);
}

export = Routes.Miscellaneous;
