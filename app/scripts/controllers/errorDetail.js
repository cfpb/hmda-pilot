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

    if (editErrors[editType] && editErrors[editType][editId]) {
        $scope.editError = editErrors[editType][editId];
    } else {
        $scope.editError = {};
    }

    $scope.backToSummary = function() {
        if (editType === 'syntactical' || editType === 'validity') {
            $location.path('/summarySyntacticalValidity');
        }
    };
};
