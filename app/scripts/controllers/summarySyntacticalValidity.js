'use strict';

/**
 * @ngdoc function
 * @name hmdaPilotApp.controller:SummarySyntacticalValidityCtrl
 * @description
 * # SummarySyntacticalValidityCtrl
 * Controller of the hmdaPilotApp
 */
module.exports = function ($scope, $location, HMDAEngine) {
    $scope.errors = HMDAEngine.getErrors();
};
