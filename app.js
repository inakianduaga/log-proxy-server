'use strict';

//Include dependencies
var express = require('express'),
    path = require('path'),
    //favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),

    //Modular Route definitions
    logEndpoints = require('./routes/logEndpoints'),
    miscRoutes = require('./routes/miscellaneous'),

    //Error handler service
    errorHandler = require('./services/errorHandler'),

    //Main app
    app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public'))); //serve public files

//Register routes (as middleware layer through express.Router())
app.use(logEndpoints);
app.use(miscRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler - will print stacktrace
// production error handler - no stacktraces leaked to user
if (app.get('env') === 'development') {
    app.use(errorHandler.development);
} else {
  app.use(errorHandler.production);
}

module.exports = app;
