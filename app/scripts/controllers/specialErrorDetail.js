'use strict';

/**
 * @ngdoc function
 * @name hmdaPilotApp.controller:SpecialErrorDetailCtrl
 * @description
 * # SpecialErrorDetailCtrl
 * Controller of the hmdaPilotApp
 */
module.exports = /*@ngInject*/ function ($scope, $routeParams, $location, $http, HMDAEngine, Session) {

    // Get the list of errors from the HMDAEngine
    var editType = 'special',
        editId = $routeParams.EditId,
        editErrors = HMDAEngine.getErrors();

    $scope.editType = editType;
    $scope.editId = editId;
    $scope.siblingEdits = [];

    if (editErrors[editType] && editErrors[editType][editId]) {
        $scope.error = editErrors[editType][editId];
        $scope.siblingEdits = Object.keys(editErrors[editType]).sort();
        $scope.selectedEditId = editId;
    } else {
        $scope.error = {};
    }

    if (editId === 'Q595') {
        if (Session.isVerified(editId)) {
            $scope.checkboxes = Session.getVerifiedReasonByEditId(editId);
        } else {
            $scope.checkboxes = [];
            for (var i = 1; i <= $scope.error.errors.length; i++) {
                $scope.checkboxes[i] = false;
            }
        }
    } else if (editId === 'Q029') {
        $scope.selectedAnswer = $scope.selectedAnswer || '0';
        if (Session.isVerified(editId)) {
            $scope.selects = Session.getVerifiedReasonByEditId(editId);
        } else {
            $scope.selects = [];
            for (var j = 1; j <= $scope.error.errors.length; j++) {
                $scope.selects[j] = '0';
            }
        }
    }

    $scope.backToSummary = function() {
        $location.path('/summaryMSA-IRS');
    };

    $scope.goToEditDetail = function() {
        $location.path('/detail/' + editType + '/' + $scope.selectedEditId);
    };

    $scope.saveSpecialVerification = function() {
        if (editId === 'Q595') {
            Session.addToVerifiedSpecialEdits(editId, $scope.checkboxes);
        } else if (editId === 'Q029') {
            Session.addToVerifiedSpecialEdits(editId, $scope.selects);
        }
        nextEdit();
    };

    // Go to the next edit in the list for the current edit type
    // or go back to the summary page if we reach the end
    function nextEdit() {
        var path = '/summaryMSA-IRS',
            currentIdx = $scope.siblingEdits.indexOf(editId);
        if (currentIdx !== ($scope.siblingEdits.length - 1)) {
            path = '/detail/' + editType + '/' + $scope.siblingEdits[currentIdx+1];
        }
        $location.path(path);
    }

    $scope.selectAll = function(selectedAnswer) {
        for (var i = $scope.start(); i <= $scope.end(); i++) {
            $scope.selects[i] = selectedAnswer;
        }
    };

    $scope.checkAll = function() {
        if ($scope.allChecked()) {
            for (var i = $scope.start(); i <= $scope.end(); i++) {
                $scope.checkboxes[i] = false;
            }
        } else {
            for (var j = $scope.start(); j <= $scope.end(); j++) {
                $scope.checkboxes[j] = true;
            }
        }
    };

    $scope.allChecked = function() {
        for (var i = $scope.start(); i <= $scope.end(); i++) {
            if ($scope.checkboxes[i] === false) {
                return false;
            }
        }
        return true;
    };
};
