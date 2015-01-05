'use strict';

require('angular');

var app = angular.module('hmdaPilotApp');

var WizardNav = require('./wizardNav');
app.directive('wizardNav', WizardNav);
