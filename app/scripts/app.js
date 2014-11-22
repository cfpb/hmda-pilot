'use strict';

require('angular');
require('angular-animate');
require('angular-aria');
require('angular-cookies');
require('angular-resource');
require('angular-route');
require('angular-sanitize');
require('angular-touch');

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
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

require('./controllers');
