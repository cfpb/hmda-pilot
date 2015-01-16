'use strict';

require('angular');

var app = angular.module('hmdaPilotApp');

var RuleEngine = require('./ruleEngine');

app.service('RuleEngine', RuleEngine);
app.factory('FileReader', require('./fileReader'));
