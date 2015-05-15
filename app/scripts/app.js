/**
 * The HMDA Pilot provides a client side tool to perform validation, error
 * checking and reporting of HMDA submitted files for the current conditions, by
 * following the specifications found on the [FFIEC](http://www.ffiec.gov/hmda)
 * website. In particular, it implements the file specification and most of the
 * edit checks for 2014.
 *
 * See README.md for more information.
 */

'use strict';

require('angular');
require('angular-aria');
require('angular-cookies');
require('angular-resource');
require('angular-route');
require('angular-sanitize');
require('./modules/config');
require('./modules/HMDAEngine');
require('./modules/hmdaFilters');
require('ng-dialog');

angular
    .module('hmdaPilotApp', [
        'ngAria',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngDialog',
        'services.config',
        'HMDAEngine',
        'hmdaFilters'
    ])
    .config(function($locationProvider, $routeProvider) {
        $locationProvider.html5Mode(true);
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
            .when('/validationSummary', {
                templateUrl: 'views/validationSummary.html',
                controller: 'ValidationSummaryCtrl'
            })
            .when('/detail/special/:EditId', {
                templateUrl: 'views/specialErrorDetail.html',
                controller: 'SpecialErrorDetailCtrl'
            })
            .when('/detail/:EditType/:EditId', {
                templateUrl: 'views/errorDetail.html',
                controller: 'ErrorDetailCtrl'
            })
            .when('/report/IRS', {
                templateUrl: 'views/reportIRS.html',
                controller: 'IRSReportCtrl'
            })
            .when('/about', {
                templateUrl: 'views/about.html'
            })
            .when('/common-questions', {
                templateUrl: 'views/common_questions.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .run(function($rootScope, $window, $location, Configuration, HMDAEngine) {
        // Set the location of the HMDA Engine API
        HMDAEngine.setAPIURL(Configuration.apiUrl);

        // Watch the value of the HMDA JSON
        // and redirect to the home page if it gets cleared out
        $rootScope.$watch(function() {
            return HMDAEngine.getHmdaJson();
        }, function(newVal) {
            if (angular.equals({}, newVal) && ['/about', '/common-questions'].indexOf($location.path()) === -1) {
                $location.path('/');
            }
        });

        // Warn the user on browser refresh that they are about to destroy their session
        if (Configuration.confirmSessionReset) {
            $window.onbeforeunload = function() {
                return 'You are about to reset your session.\n\nDoing so will return you to the Select File and Validate page and you will need to resubmit your HMDA File for validation.';
            };
        }

        // Make bluebird promises behave like $q promises
        // http://stackoverflow.com/questions/23984471/how-do-i-use-bluebird-with-angular
        Promise.setScheduler(function(cb) {
            $rootScope.$evalAsync(cb);
        });
    });

require('./services');
require('./directives');
require('./controllers');
