'use strict';

require('hmda-rule-engine');

/**
 * Exposes the HMDA Rule Engine as an Angular module.
 *
 * @module HMDAEngine
 * @returns {object} Instance of the HMDA Rule Engine
 */
var HMDAEngine = angular.module('HMDAEngine', []);
HMDAEngine.factory('HMDAEngine', function() {
    return window.HMDAEngine;
});
