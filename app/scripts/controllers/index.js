'use strict';

require('angular');
var app = angular.module('hmdaPilotApp');

var AboutCtrl = require('./about');
var MainCtrl = require('./main');

app.controller('AboutCtrl', AboutCtrl);
app.controller('MainCtrl', MainCtrl);
