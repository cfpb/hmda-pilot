'use strict';

/**
 * @ngdoc function
 * @name hmdaPilotApp.controller:ErrorDetailCtrl
 * @description
 * # ErrorDetailCtrl
 * Controller of the hmdaPilotApp
 */
module.exports = /*@ngInject*/ function ($scope, $routeParams, $location, HMDAEngine) {

    // Get the list of errors from the HMDAEngine
    var editType = $routeParams.EditType,
        editId = $routeParams.EditId,
        editErrors = HMDAEngine.getErrors();

    $scope.editType = editType;
    $scope.editId = editId;
    $scope.siblingEdits = [];

    if (editErrors[editType] && editErrors[editType][editId]) {
        $scope.editError = editErrors[editType][editId];
        $scope.siblingEdits = Object.keys(editErrors[editType]).sort();
        $scope.selectedEditId = editId;
    } else {
        $scope.editError = {};
    }

    $scope.backToSummary = function() {
        if (editType === 'syntactical' || editType === 'validity') {
            $location.path('/summarySyntacticalValidity');
        } else { // Go back to the start if nothing matches
            $location.path('/');
        }
    };

    $scope.goToEditDetail = function() {
        $location.path('/detail/' + editType + '/' + $scope.selectedEditId);
    };
};
