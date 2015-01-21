'use strict';

require('angular');

var app = angular.module('hmdaPilotApp');

app.service('FileMetadata', require('./fileMetadata'));
app.factory('FileReader', require('./fileReader'));
