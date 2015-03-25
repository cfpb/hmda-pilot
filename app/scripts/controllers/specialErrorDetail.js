'use strict';

/**
 * @ngdoc function
 * @name hmdaPilotApp.controller:SpecialErrorDetailCtrl
 * @description
 * # SpecialErrorDetailCtrl
 * Controller of the hmdaPilotApp
 */
module.exports = /*@ngInject*/ function ($scope, $routeParams, $location, $http, $filter, HMDAEngine, Session) {

    // Get the list of errors from the HMDAEngine
    var editType = 'special',
        editId = $routeParams.EditId,
        editErrors = HMDAEngine.getErrors();

    $scope.editType = editType;
    $scope.editId = editId;
    $scope.siblingEdits = [];
    $scope.reverse = false;
    $scope.sortedBy = '';

    if (editErrors[editType] && editErrors[editType][editId]) {
        $scope.error = editErrors[editType][editId];
        $scope.siblingEdits = Object.keys(editErrors[editType]).sort();
        $scope.selectedEditId = editId;
    } else {
        $scope.error = {};
    }

    $scope.sort = function(property) {
        $scope.reverse = $scope.sortedBy === property ? !$scope.reverse : false;
        $scope.sortedBy = property;
        $scope.error.errors = $filter('orderBy')($scope.error.errors, property, $scope.reverse);
    };

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
};
