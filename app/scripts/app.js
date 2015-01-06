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
    .run(function (Wizard, StepFactory) {
        Wizard.initSteps([
            new StepFactory('Select file & upload', 'selectFile'),
            new StepFactory('Syntactical & validity edit reports', 'summarySyntacticalValidity'),
            new StepFactory('Quality & macro edit reports', 'summaryQualityMacro'),
            new StepFactory('MSA and IRS reports', 'summaryMSA-IRS'),
            new StepFactory('Submit', 'submit')
        ]);
    });

// App specific requirements (Note: leave these at the bottom)
require('./services');
require('./directives');
require('./controllers');
