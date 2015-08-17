import express = require('express');
import settingsController = require('./../controllers/settings');

module Routes.Settings {

  export const router = express.Router();

  router.get('/settings', settingsController.get);
}

export = Routes.Settings;
