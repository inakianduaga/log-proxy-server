'use strict';

var gulp = require('gulp'),
    notifications = require('./lib/notifications'),
    helper = require('./lib/helper'),
    events = require('./lib/events');

//---------------
// Tasks
//---------------

gulp.task('tdd', 'Runs unit tests when file changes are detected', function () {
  gulp.watch('**/*.js', ['test']);
});

gulp.task('lintWatcher', false, function () {
  gulp.watch('**/*.js', ['lint']);
});

gulp.task('rebuildOnPackageJsonChange', false, function(){
  gulp.watch('package.json', ['docker:build']);
});

gulp.task('watch', 'Master watch task, adds cumulative watches (test/lint)', ['tdd', 'lintWatcher', 'rebuildOnPackageJsonChange'], function () {
});


