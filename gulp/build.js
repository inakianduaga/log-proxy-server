'use strict';

//Dependencies
var gulp = require('gulp'),
  $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'del', 'run-sequence', 'js-yaml']
  }),
  config = require('./config.json'),
  tsConfig = require('../tsconfig.json');


/**
 * Create typescript project build reference for incremental compilation under watch tasks
 *
 * @link https://github.com/ivogabe/gulp-typescript
 */
var tsProject = $.typescript.createProject('tsconfig.json', {
  // Override package version of typescript to use latest compiler version
  typescript: require('typescript')
});

/**
 * Cleans the dist folder
 */
gulp.task('clean', false, function () {
  return $.del(['dist']);
});

/**
 * Precopies all non-ts files into the dist folder
 */
gulp.task('copyNonTs', false, [], function () {
  return gulp.src(['src/.env','src/**/*', '!src/**/*.ts'])
    .pipe(gulp.dest('dist'));
});

/**
 * Precopies the swagger-ui assets into the dist folder
 */
gulp.task('copySwaggerUI', false, [], function () {
  return gulp.src(['node_modules/swaggerize-ui/node_modules/swagger-ui/dist/**/*'])
    .pipe(gulp.dest('dist/swagger/dist'));
});

/**
 * Converts swagger spec from json to yaml format
 */
gulp.task('convertSwaggerSpecFromYamlToJson', false, [], function () {
  var fs = require('fs');
  var swaggerSpec = $.jsYaml.safeLoad(fs.readFileSync('./src/swagger/spec.yaml', 'utf8'));
  fs.writeFileSync('dist/swagger/spec.json', JSON.stringify(swaggerSpec));
  return;
});

/**
 * Lints typescript code
 */
gulp.task('lint', 'Runs a typescript linter on the application code', function () {

  return gulp.src(config.tsLinter.sources)
    .pipe($.tslint(config.tsLinter.options))
    .pipe($.tslint.report(config.tsLinter.reporter));

});

/**
 * Compiles typescript app into js
 */
gulp.task('compile', false, function () {

  var tsResult = gulp.src(tsConfig.files)
      .pipe($.typescript(tsProject, undefined, $.typescript.reporter.longReporter()));

  return tsResult.js
    .pipe(gulp.dest('dist'));
});

/**
 * Build the server app
 */
gulp.task('build', 'Builds the server app (compiles & copies)', function (callback) {
  return $.runSequence('clean',
    ['compile'],
    'copyNonTs',
    'copySwaggerUI',
    'convertSwaggerSpecFromYamlToJson',
    callback);
});