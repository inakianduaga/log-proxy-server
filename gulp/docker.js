'use strict';

//Dependencies
var gulp = require('gulp'),
  $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'q']
  }),
  dockerConfiguration = require('./docker/config.json');
  $.environment = require('./lib/environment.js');


gulp.task('docker:build', 'Builds the docker container using current codebase', function() {

  return gulp.src('').pipe($.shell([
      'docker build -t ' + dockerConfiguration.IMAGE_TAG + ' .'
    ], {
      quiet : false
    })
  );

});

gulp.task('docker:push', 'Pushes the docker build to the upstream repository', function() {

  return gulp.src('').pipe($.shell([
      'docker push ' + dockerConfiguration.IMAGE_TAG + '.'
    ], {
      quiet : false
    })
  );

});

gulp.task('docker:watchAndServe', 'Launch the server running inside a DOCKER container on development mode, and runs the regular watchAndServe task', ['docker:build'], function () {

  var port = $.environment.get('port', 3000);

  //process.on('SIGINT', killDockerContainer); //doesn't seem to be working

  return gulp.src('').pipe($.shell([
      'docker rm -f '+dockerConfiguration.IMAGE_TAG,
      'docker run -it --rm --name '+ dockerConfiguration.IMAGE_TAG +' -p 3000:'+ port +' -v "$(pwd)":/usr/src/myapp -w /usr/src/myapp node:0.10 ./node_modules/gulp/bin/gulp.js watchAndServe'
    ], {
      quiet : false
    })
  );

}, {
  options: {
    'port': 'The port # the server should listen to. Defaults to 3000'
  }
});

gulp.task('docker:kill', 'Kills the running docker container', function() {

  return gulp.src('').pipe($.shell([
      'docker rm -f '+dockerConfiguration.IMAGE_TAG,
    ], {
      quiet : false
    })
  );

});


function killDockerContainer() {

  console.log('Killing container "' + dockerConfiguration.IMAGE_TAG +'"' );

  return gulp.src('').pipe($.shell([
      'docker rm -f ' + dockerConfiguration.IMAGE_TAG
    ], {
      quiet: true
    })
  );

}


