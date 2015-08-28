/// <reference path="../typings/tsd.d.ts" />

'use strict';

// Include dependencies
import express = require('express');
import path = require('path');
import logger = require('morgan');
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');

// Modular Route definitions
import logEndpoints = require('./routes/logEndpoints');
import miscRoutes = require('./routes/miscellaneous');
import settingsRoutes = require('./routes/settings');
import swaggerRoutes = require('./routes/swagger');

// Services
import errorHandler = require('./services/errorHandler');
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

app.use(swaggerRoutes.router);

// Register settings-derived loggers
app.use(winstonLogger.instantiateLoggers);

// Register routes (as middleware layer through express.Router())
app.use(logEndpoints.router);
app.use(miscRoutes.router);
app.use(settingsRoutes.router);

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
