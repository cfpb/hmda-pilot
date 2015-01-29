'use strict';

require('angular');

var app = angular.module('hmdaPilotApp');

app.controller('SelectFileCtrl', require('./selectFile'));
app.controller('SummarySyntacticalValidityCtrl', require('./summarySyntacticalValidity'));
app.controller('SummaryQualityMacroCtrl', require('./summaryQualityMacro'));
app.controller('SummaryMSAIRSCtrl', require('./summaryMSA-IRS'));
app.controller('SubmitCtrl', require('./submit'));
app.controller('ErrorDetailCtrl', require('./errorDetail'));
