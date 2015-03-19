// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2014-11-18 using
// generator-karma 0.8.3

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine', 'browserify'],

    // list of files / patterns to load in the browser
    files: [
      'node_modules/jquery/dist/jquery.js',
      'app/**/*.js',
      //'test/mock/**/*.js',
      'test/spec/**/*.js',
      {
        pattern: 'app/partials/**/*.html',
        watched: true,
        included: false,
        served: true
      }
    ],

    // list of files / patterns to exclude
    exclude: [
      '**/bundle.js'
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Set browser activity timeout to give CI server time to build
    // browserify bundle for tests after starting the browser
    browserNoActivityTimeout: 20000,

    // Which plugins to enable
    plugins: [
      'karma-browserify',
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-coverage',
      'karma-mocha-reporter'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'

    // Browserify config
    browserify: {
      watch: true,
      debug: true,
      transform: ['browserify-istanbul']
    },

    // Reporters
    reporters: ['mocha', 'coverage'],

    // Coverage reporter configuration
    coverageReporter : {
      dir: 'coverage/',
      reporters: [
        { type: 'lcov', subdir: 'coveralls'},
        { type: 'html', subdir: 'html-report' },
        { type: 'text-summary' }
      ]
    },

    // Preproccessors
    preprocessors: {
      'app/**/*.js': ['coverage', 'browserify'],
      'test/**/*.js': ['browserify']
    }
  });
};
