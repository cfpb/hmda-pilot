'use strict';

require('angular');

var app = angular.module('hmdaPilotApp');

app.directive('ngFileSelect', require('./fileSelector'));
app.directive('errorSummary', require('./errorSummary'));
app.directive('errorDetail',  require('./errorDetail'));
app.directive('fileMetadata', require('./fileMetadata'));
app.directive('wizardNav',    require('./wizardNav'));
app.directive('cfButton',     require('./cfButton'));
app.directive('disclaimer',   require('./disclaimer'));
