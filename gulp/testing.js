'use strict';

var gulp = require('gulp'),
  $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'q', 'run-sequence', 'del']
  }),
  environment = require('./lib/environment.js');

// Code coverage report
gulp.task('testCoverage', 'Generate a test coverage report (for mocha tests only)', [], function () {
  return $.runSequence(['build', 'cleanCoverage'],'copyNonTs',function () {
      return gulp.src('dist/**/*.js')
        .pipe($.istanbul())
        .pipe($.istanbul.hookRequire())
        .on('finish', function () {
          gulp.src('dist/spec/routes/exampleMochaSpec.js')
            .pipe($.mocha({ reporter: 'spec' }))
            .pipe($.istanbul.writeReports({
              dir: './coverage',
              reporters: ['lcov'],
              reportOpts: { dir: './coverage'}
              })
            );
        });
    });
});

// Submit generated code coverage information to coveralls
gulp.task('coveralls', 'Submit generated code coverage information to coveralls (works only under travis ci environment)', ['testCoverage'], function() {
  gulp.src('coverage/**/lcov.info')
      .pipe($.coveralls());
});

// Cleans the coverage folder
gulp.task('cleanCoverage', false, function () {
  return $.del(['coverage']);
});

// Main test tasks, choose between mocha or jasmine (or keep both)
gulp.task('test', 'Run unit tests (once)', ['build'], function () {
  var reporter = environment.get('reporter', 'dot');

  return gulp.src('dist/spec/**/*.js', {read: false})
    // gulp-mocha needs filepaths so you can't have any plugins before it
    .pipe($.mocha({ reporter: reporter }))
    .pipe(gulp.dest('coverage'));
});

