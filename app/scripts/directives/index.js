'use strict';

require('angular');

var app = angular.module('hmdaPilotApp');

app.directive('ngFileSelect', require('./fileSelector'));
app.directive('errorSummary', require('./errorSummary'));
