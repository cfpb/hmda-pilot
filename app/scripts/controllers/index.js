'use strict';

require('angular');

var app = angular.module('hmdaPilotApp');

app.controller('LoginCtrl', require('./login'));
app.controller('SelectFileCtrl', require('./selectFile'));
app.controller('SummarySyntacticalValidityCtrl', require('./summarySyntacticalValidity'));
app.controller('SummaryQualityMacroCtrl', require('./summaryQualityMacro'));
app.controller('SummaryMSAIRSCtrl', require('./summaryMSA-IRS'));
app.controller('ValidationSummaryCtrl', require('./validationSummary'));
app.controller('ErrorDetailCtrl', require('./errorDetail'));
app.controller('SpecialErrorDetailCtrl', require('./specialErrorDetail'));
app.controller('IRSReportCtrl', require('./irsReport'));
app.controller('PaginationCtrl', require('./pagination'));
app.controller('ProgressBarCtrl', require('./progressBar'));
