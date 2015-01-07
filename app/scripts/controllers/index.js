'use strict';

require('angular');
var app = angular.module('hmdaPilotApp');

var AboutCtrl = require('./about');
var SelectFileCtrl = require('./selectFile');

app.controller('AboutCtrl', AboutCtrl);
app.controller('SelectFileCtrl', SelectFileCtrl);
