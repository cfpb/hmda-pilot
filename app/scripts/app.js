'use strict';

require('angular');
require('angular-animate');
require('angular-aria');
require('angular-cookies');
require('angular-resource');
require('angular-route');
require('angular-sanitize');
require('angular-touch');
require('./modules/config');
require('./modules/HMDAEngine');
require('./modules/hmdaFilters');

/**
 * @ngdoc overview
 * @name hmdaPilotApp
 * @description
 * # hmdaPilotApp
 *
 * Main module of the application.
 */
angular
  .module('hmdaPilotApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'services.config',
    'HMDAEngine'
    'hmdaFilters'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/selectFile.html',
        controller: 'SelectFileCtrl'
      })
      .when('/summarySyntacticalValidity', {
        templateUrl: 'views/summarySyntacticalValidity.html',
        controller: 'SummarySyntacticalValidityCtrl'
      })
      .when('/summaryQualityMacro', {
        templateUrl: 'views/summaryQualityMacro.html',
        controller: 'SummaryQualityMacroCtrl'
      })
      .when('/summaryMSA-IRS', {
        templateUrl: 'views/summaryMSA-IRS.html',
        controller: 'SummaryMSAIRSCtrl'
      })
      .when('/submit', {
        templateUrl: 'views/submit.html',
        controller: 'SubmitCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function (Configuration, HMDAEngine) {
    // Set the location of the HMDA Engine API
    HMDAEngine.setAPIURL(Configuration.apiUrl);
  });

require('./services');
require('./directives');
require('./controllers');
