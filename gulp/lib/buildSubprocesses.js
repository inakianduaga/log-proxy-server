'use strict';

/**
 * Assets-related subprocesses (gulp lazypipes)
 */

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'uglify-save-license', 'lazypipe']
});


/**
 * Public API
 * We store the api in a function and use an innver variable so we can self-reference the object
 * http://stackoverflow.com/questions/2661867/nested-function-inside-literal-object
 * @type {object}
 */
var api = (function () {

  var _this = {

    shared: {

      /**
       * File concatenation pipe w/ optional sourcemap generation
       *
       * @param {String} filename the concatenated filename
       * @param {Boolean=} addSourcemaps whether to add sourcemaps or not
       */
      concatenate: function (filename, addSourcemaps) {

        var concat = $.lazypipe().pipe(function () {
              return $.concat(filename);
            });

        return addSourcemaps ? _this.shared.sourcemaps('start').pipe(concat).pipe(_this.shared.sourcemaps('end')) : concat;
      },

      /**
       * File concatenation pipe w/ optional sourcemap generation
       *
       * @param {String} part can be start/end
       */
      sourcemaps: function (part) {

        var sourcemapStart = $.lazypipe()
              .pipe(function () {
                return $.sourcemaps.init();
              }),
            sourcemapEnd = $.lazypipe()
              .pipe(function () {
                return $.sourcemaps.write();
              });

        return (part === 'init' || part === 'start') ? sourcemapStart : sourcemapEnd;
      },

      /**
       * Filters out files from the current stream that haven't changed
       *
       * @param {String} destination This should be the same as gulp.dest(), it's what is used to compare the files
       * @param {String=} changeDetection can be compareLastModifiedTime|compareSha1Digest
       */
      filterChanged : function(destination, changeDetection) {

        if (typeof changeDetection === 'undefined') {
          changeDetection = 'compareSha1Digest';
        }

        return $.lazypipe().pipe(function () {
          return $.changed(destination, {hasChanged: $.changed[changeDetection]});
        });
      }

    },

    /////////
    // CSS //
    /////////

    css: {

      /**
       * Css minification pipe
       */
      minifyCSS: $.lazypipe().pipe(function () {
          return $.csso();
        }),

      /**
       * Css concatenation pipe w/ optional sourcemap generation
       *
       * @param {String} filename the concatenated filename
       * @param {Boolean=} addSourcemaps whether to add sourcemaps or not
       */
      concatenateCSS: function (filename, addSourcemaps) {
        return _this.shared.concatenate(filename, addSourcemaps);
      },

      /**
       * Less compilation pipe
       */
      compileLess: $.lazypipe().pipe(function () {
          return $.less().on('error', function (err) {
            console.error(err.toString());
            this.emit('end');
          });
      }),

      /**
       * CSS autoprefixing pipe
       * @param {String=} version browser versions used for reference to autoprefix
       */
      autoprefixCSS: function (version) {

        if (typeof version === 'undefined') {
          version = 'last 1 version';
        }

        return $.lazypipe().pipe(function () {
          return $.autoprefixer(version);
        });
      },

      /**
       * Cloudfront css url prefixer pipe
       * Prefixes all urls references inside css files with an endpoint
       *
       * @param {String} endpoint
       */
      cloudfrontRedirectUrls: function (endpoint) {
        return $.lazypipe().pipe(function () {
          return $.cssUrlAdjuster({
            prepend: endpoint
          });
        });
      },


      //Combined processes
      combined: {

        /**
         * Combination of pipes to use under non-production environments
         *
         * @param {String} destFilename The filename we use to save the asset
         */
        standardEnv: function (destFilename) {
          return _this.shared.sourcemaps('start')
          .pipe(_this.css.compileLess)
          .pipe(_this.css.autoprefixCSS())
          .pipe(_this.css.concatenateCSS(destFilename, false))
          .pipe(_this.shared.sourcemaps('end'));
        },

        /**
         * Combination of pipes to use under production environment
         *
         * @param {String} destFilename
         * @param {String|Array} autoPrefixerVersion
         * @param {String=} Optional cloudfrontEndpoint to redirect inside css files
         */
        productionEnv: function (destFilename, autoPrefixerVersion, cloudfrontEndpoint) {
          return _this.css.compileLess
            //.pipe(_this.css.cloudfrontRedirectUrls(cloudfrontEndpoint))
            .pipe(_this.css.minifyCSS)
            .pipe(_this.css.autoprefixCSS(autoPrefixerVersion))
            .pipe(_this.css.concatenateCSS(destFilename, false));
        }

      }

    },

    ////////////////
    // JAVASCRIPT //
    ////////////////

    js: {

      /**
       * Lint JS
       *
       * @param {Object=} options for jshint
       * @param {String=} reporter what reporter we use for jsHint linter
       */
      lintJS: function (options, reporter) {

        options = options || {};

        if (!reporter) {
          reporter = 'jshint-stylish';
        }

        return $.lazypipe().pipe(function () {
          return $.jshint(options);
        }).pipe(function () {
          return $.jshint.reporter(reporter);
        });

      },

      /**
       * Minify javascript, w/ optional angular annotation preprocessing
       *
       * @param {Boolean=} Whether to run ng-annotate on the scripts before minification
       */
      minifyJS: function(annotate) {

        if(typeof annotate === 'undefined') {
          annotate = false;
        }

        var annotateStep = $.lazypipe().pipe(function () {
          return $.ngAnnotate();
        });

        var minifyStep = $.lazypipe().pipe(function () {
          return $.uglify();
        });

        return annotate ? annotateStep.pipe(minifyStep) : minifyStep;
      },

      /**
       * JS concatenation pipe w/ optional sourcemap generation
       *
       * @param {String} filename the concatenated filename
       * @param {Boolean=} addSourcemaps whether to add sourcemaps or not
       */
      concatenateJS: function (filename, addSourcemaps) {
        return _this.shared.concatenate(filename, addSourcemaps);
      },

      //Combined processes
      combined: {

        /**
         * Combination of pipes to use under non-production environments
         *
         * @param {String} destFilename The filename we use to save the asset
         */
        standardEnv: function (destFilename) {
          return _this.js.concatenateJS(destFilename, true);
        },

        /**
         * Combination of pipes to use under production environment
         *
         * @param {String} destFilename
         * @param {Boolean=} Whether to run ng-annotate on the scripts before minification. Use for angular apps
         */
        productionEnv: function (destFilename, annotate) {
            return _this.js.concatenateJS(destFilename, false)
              .pipe(_this.js.minifyJS(annotate));
        }

      }

    }

  };

  return _this;

})();

module.exports = api;
