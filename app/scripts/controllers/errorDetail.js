'use strict';

/**
 * @ngdoc function
 * @name hmdaPilotApp.controller:ErrorDetailCtrl
 * @description
 * # ErrorDetailCtrl
 * Controller of the hmdaPilotApp
 */
module.exports = /*@ngInject*/ function ($scope, $routeParams, $location, $http, HMDAEngine, Session) {

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

    if (editType === 'macro') {
        $scope.comments = [];
        $http.get('data/macro-comments.json').success(function(data) {
            $scope.comments = data[editId];
        });
    }

    $scope.backToSummary = function() {
        if (editType === 'syntactical' || editType === 'validity') {
            $location.path('/summarySyntacticalValidity');
        } else if (editType === 'quality' || editType === 'macro') {
            $location.path('/summaryQualityMacro');
        } else { // Go back to the start if nothing matches
            $location.path('/');
        }
    };

    $scope.goToEditDetail = function() {
        $location.path('/detail/' + editType + '/' + $scope.selectedEditId);
    };

    $scope.saveQualityVerification = function(response) {
        if (response.verified) {
            Session.addToVerifiedQualityEdits(editId);
        }
        $location.path('/summaryQualityMacro');
    };

    $scope.saveMacroVerification = function(response) {
        if (response.verified && response.reason) {
            Session.addToVerifiedMacroEdits(editId, response.reason);
        }
        $location.path('/summaryQualityMacro');
    };
};
