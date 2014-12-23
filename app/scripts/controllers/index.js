'use strict';

require('angular');
var app = angular.module('hmdaPilotApp');

var SelectFileCtrl = require('./selectFile');
app.controller('SelectFileCtrl', SelectFileCtrl);

var SummarySyntacticalValidityCtrl = require('./summarySyntacticalValidity');
app.controller('SummarySyntacticalValidityCtrl', SummarySyntacticalValidityCtrl);

var SummaryQualityMacroCtrlCtrl = require('./summaryQualityMacro');
app.controller('SummaryQualityMacroCtrl', SummaryQualityMacroCtrlCtrl);

var SummaryMSAIRSCtrl = require('./summaryMSA-IRS');
app.controller('SummaryMSAIRSCtrl', SummaryMSAIRSCtrl);

var SubmitCtrl = require('./submit');
app.controller('SubmitCtrl', SubmitCtrl);

var AboutCtrl = require('./about');
app.controller('AboutCtrl', AboutCtrl);
