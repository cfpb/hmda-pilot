'use strict';

require('angular');

var app = angular.module('hmdaPilotApp');

var RuleEngine = require('./ruleEngine');
app.service('RuleEngine', RuleEngine);

var Wizard = require('./wizard');
app.service('Wizard', Wizard);
