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

    $scope.hasNext = function() {
        return angular.equals({}, $scope.errors.syntactical) && angular.equals({}, $scope.errors.validity);
    };

    $scope.next = function() {
        $location.path('/summaryQualityMacro');
    };
};
