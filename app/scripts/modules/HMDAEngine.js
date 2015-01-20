'use strict';

require('hmda-rule-engine');

var HMDAEngine = angular.module('HMDAEngine', []);
HMDAEngine.factory('HMDAEngine', function() {
    return window.HMDAEngine;
});
