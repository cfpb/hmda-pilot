'use strict';

require('angular');

var app = angular.module('hmdaPilotApp');

app.service('FileMetadata', require('./fileMetadata'));
app.factory('FileReader', require('./fileReader'));
app.constant('StepStatus',  require('./stepStatus'));
app.factory('StepFactory',  require('./stepFactory'));
app.service('Wizard',       require('./wizard'));
