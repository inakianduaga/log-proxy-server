/// <reference path="../typings/tsd.d.ts" />

'use strict';

// Include dependencies
import express = require('express');
import path = require('path');
import logger = require('morgan');
import favicon = require('serve-favicon');
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');

// Modular Route definitions
import logEndpoints = require('./routes/logEndpoints');
import miscRoutes = require('./routes/miscellaneous');
import settingsRoutes = require('./routes/settings');

// Services
import errorHandler = require('./services/errorHandler');
import settings = require('./services/settings');
import winstonLogger = require('./services/winstonLogger');

// Main app
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public'))); //serve public files

// Settings Middleware for all routes
app.use(settings.parseRequestSettings);

// Register a new winston logger for each request
app.use(winstonLogger.instantiateNewLogger);

// Register routes (as middleware layer through express.Router())
app.use(logEndpoints);
app.use(miscRoutes);
app.use(settingsRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not Found');
    res.status(404);
    console.log('catching 404 error');
    return next(err);
});

// error handlers

// development error handler - will print stacktrace
// production error handler - no stacktraces leaked to user
if (app.get('env') === 'development') {
    app.use(errorHandler.development);
} else {
  app.use(errorHandler.production);
}

export = app;
