'use strict';

/**
 * Provides the scope and functions for the special, Q029 and Q595, Error Detail
 * views.
 *
 * @namespace hmdaPilotApp
 * @module {Controller} SpecialErrorDetail
 */
module.exports = /*@ngInject*/ function($scope, $routeParams, $location, $http, $filter, HMDAEngine, Session) {

    // Get the list of errors from the HMDAEngine
    var editType = 'special',
        editId = $routeParams.EditId,
        editErrors = HMDAEngine.getErrors();

    $scope.editType = editType;
    $scope.editId = editId;
    $scope.siblingEdits = [];
    $scope.sortAsc = false;
    $scope.sortedBy = '';

    if (editErrors[editType] && editErrors[editType][editId]) {
        $scope.error = editErrors[editType][editId];
        $scope.siblingEdits = Object.keys(editErrors[editType]).sort();
        $scope.selectedEditId = editId;
    } else {
        $scope.error = {};
    }

    $scope.sort = function(property) {
        $scope.sortAsc = $scope.sortedBy === property ? !$scope.sortAsc : false;
        $scope.sortedBy = property;
        $scope.error.errors = $filter('orderBy')($scope.error.errors, property, $scope.sortAsc);
        $scope.paginate.currentPage = 1;
    };

    $scope.isSortedBy = function(property) {
        if ($scope.sortedBy === property) {
            return $scope.sortAsc ? 'descending' : 'ascending';
        }
        return 'none';
    };

    $scope.isSortedUp = function(property) {
        return $scope.sortedBy === property && !$scope.sortAsc;
    };

    $scope.isSortedDown = function(property) {
        return $scope.sortedBy === property && $scope.sortAsc;
    };

    if (editId === 'Q595') {
        if (Session.isVerified(editId)) {
            var checkboxes = Session.getVerifiedReasonByEditId(editId);
            angular.forEach($scope.error.errors, function(error) {
                error.properties.checkbox = checkboxes[error.properties['MSA/MD']];
            });
        } else {
            for (var i = 0; i < $scope.error.errors.length; i++) {
                $scope.error.errors[i].properties.checkbox = false;
            }
        }
    } else if (editId === 'Q029') {
        $scope.selectedAnswer = $scope.selectedAnswer || '0';
        if (Session.isVerified(editId)) {
            var selects = Session.getVerifiedReasonByEditId(editId);
            angular.forEach($scope.error.errors, function(error) {
                error.properties.select = selects[error.properties['LAR number']];
            });
        } else {
            for (var j = 0; j < $scope.error.errors.length; j++) {
                $scope.error.errors[j].properties.select = '0';
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
            var checkboxes = {};
            angular.forEach($scope.error.errors, function(error) {
                checkboxes[error.properties['MSA/MD']] = error.properties.checkbox;
            });
            Session.addToVerifiedSpecialEdits(editId, checkboxes);
        } else if (editId === 'Q029') {
            var selects = {};
            angular.forEach($scope.error.errors, function(error) {
                selects[error.properties['LAR number']] = error.properties.select;
            });
            Session.addToVerifiedSpecialEdits(editId, selects);
        }
        nextEdit();
    };

    // Go to the next edit in the list for the current edit type
    // or go back to the summary page if we reach the end
    function nextEdit() {
        var path = '/summaryMSA-IRS',
            currentIdx = $scope.siblingEdits.indexOf(editId);
        if (currentIdx !== ($scope.siblingEdits.length - 1)) {
            path = '/detail/' + editType + '/' + $scope.siblingEdits[currentIdx + 1];
        }
        $location.path(path);
    }
};
