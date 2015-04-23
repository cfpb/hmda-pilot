'use strict';

/**
 * Provides the scope and functions for the Syntactical, Validity, Quality and
 * Macro Error Detail views.
 *
 * @namespace hmdaPilotApp
 * @module {Controller} ErrorDetail
 */
module.exports = /*@ngInject*/ function($scope, $routeParams, $location, $http, HMDAEngine, Session) {

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

    if (editType === 'quality') {
        $scope.verified = Session.isVerified(editId);
        $scope.canVerify = $scope.verified;
    } else if (editType === 'macro') {
        $scope.reasonList = [];
        $http.get('data/macro-comments.json').success(function(data) {
            $scope.reasonList = data[editId];
        });

        $scope.verified = Session.isVerified(editId);
        $scope.selectedReason = Session.getVerifiedReasonByEditId(editId);
    }
    $scope.response = {};
    $scope.response.verified = $scope.verified;
    $scope.response.reason = $scope.selectedReason;

    $scope.backToSummary = function() {
        if (editType === 'syntactical' || editType === 'validity') {
            $location.path('/summarySyntacticalValidity');
        } else if (editType === 'quality' || editType === 'macro') {
            $location.path('/summaryQualityMacro');
        } else { // Go back to the start if nothing matches
            $location.path('/');
        }
    };

    $scope.goToEditDetail = function(editId) {
        $location.path('/detail/' + editType + '/' + editId);
    };

    $scope.saveQualityVerification = function() {
        if ($scope.response.verified) {
            Session.addToVerifiedQualityEdits(editId);
        } else {
            Session.removeVerifiedQualityEdit(editId);
        }
        nextEdit();
    };

    $scope.saveMacroVerification = function() {
        if ($scope.response.verified && $scope.response.reason) {
            Session.addToVerifiedMacroEdits(editId, $scope.response.reason);
        } else {
            Session.removeVerifiedMacroEdit(editId);
        }
        nextEdit();
    };

    // Go to the next edit in the list for the current edit type
    // or go back to the summary page if we reach the end
    function nextEdit() {
        var path = '/summaryQualityMacro',
            currentIdx = $scope.siblingEdits.indexOf(editId);
        if (currentIdx !== ($scope.siblingEdits.length - 1)) {
            path = '/detail/' + editType + '/' + $scope.siblingEdits[currentIdx + 1];
        }
        $location.path(path);
    }
};
