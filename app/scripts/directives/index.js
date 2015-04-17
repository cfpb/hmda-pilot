'use strict';

require('angular');

var app = angular.module('hmdaPilotApp');

app.directive('ngFileSelect', require('./fileSelector'));
app.directive('errorSummary', require('./errorSummary'));
app.directive('errorDetail',  require('./errorDetail'));
app.directive('fileMetadata', require('./fileMetadata'));
app.directive('wizardNav',    require('./wizardNav'));
app.directive('disclaimer',   require('./disclaimer'));
app.directive('paginationSize',   require('./paginationSize'));
app.directive('paginationNav',   require('./paginationNav'));
app.directive('pagination',   require('./pagination'));
app.directive('hmdaExport',   require('./hmdaExport'));
app.directive('codeDescriptions',   require('./codeDescriptions'));
