'use strict';

/**
 * @ngdoc function
 * @name hmdaPilotApp.controller:SummarySyntacticalValidityCtrl
 * @description
 * # SummarySyntacticalValidityCtrl
 * Controller for the Syntactical and Validity Summary view
 */
module.exports = function ($scope, $location, HMDAEngine) {

    // Get the list of errors from the HMDAEngine
    var editErrors = HMDAEngine.getErrors();

    $scope.syntacticalErrors = editErrors.syntactical || {};
    $scope.validityErrors = editErrors.validity || {};

    $scope.hasNext = function() {
        return angular.equals({}, $scope.syntacticalErrors) && angular.equals({}, $scope.validityErrors);
    };

    $scope.next = function() {
        $location.path('/summaryQualityMacro');
    };
};
