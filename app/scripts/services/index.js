'use strict';

require('angular');

var app = angular.module('hmdaPilotApp');

var RuleEngine = require('./ruleEngine');
app.service('RuleEngine', RuleEngine);

var StepStatus = require('./stepStatus');
app.constant('StepStatus', StepStatus);

var StepFactory = require('./stepFactory');
app.factory('StepFactory', StepFactory);

var Wizard = require('./wizard');
app.service('Wizard', Wizard);
