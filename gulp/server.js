'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'pm2']
    }),
    environment = require('./lib/environment.js');

gulp.task('serve', 'Launch the server on development mode, autoreloads it when there are code changes', ['build'], function () {

  var nodemonConfiguration = {
    script: './dist/server.js',
    ext: 'jade ts', //reload when any of these file extensions changes
    ignore: [],
    env : {
      'NODE_ENV': 'development'
    }
  };

  // Add port to configuration if specified, otherwise leave out so dotenv .env file can be potentially used
  if (environment.get('port', false)) {
    nodemonConfiguration.env.PORT = environment.get('port');
  }

  $.nodemon(nodemonConfiguration)
    //.on('change', ['lint'])
    .on('restart', function () {
      console.log('restarted!')
    });

}, {
  options: {
    'port': 'The port # the server should listen to. Defaults to value specified in .env file under PORT, or 3000 if .env not present'
  }
});

gulp.task('serveCluster', 'Launches clusterized server (for production)', ['build'], function () {
  $.pm2.connect(function() {
    $.pm2.start({
      script    : './dist/server.js',                                     // Script to be run
      exec_mode : environment.get('exec_mode', 'cluster'),                // Allow your app to be clustered
      instances : environment.get('instances', 4),                        // Optional: Scale your app by 4
      max_memory_restart: environment.get('max_memory_restart', '100M'),  // Optional: Restart your app if it reaches 100Mo
    }, function(err, apps) {
      $.pm2.disconnect();
    });
  });

}, {
  options: {
    'exec_mode': 'PM2 exec mode',
    'instances': 'PM2 # instances in cluster',
    'max_memory_restart' : 'PM2 Restart your app if it reaches this'
  }
});


