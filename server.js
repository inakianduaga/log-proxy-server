#!/usr/bin/env node

'use strict';

//Load environment variables
var dotenv = require('dotenv');
dotenv.load();

//Boot server
var debug = require('debug')('server');
var app = require('./app');

app.set('port', process.env.PORT || 80); //we need port 80 for amazon nodejs opsworks layer to work

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
}).on('error', function(err) {
  console.log('Cannot start server, port most likely in use');
  console.log(err);
});
