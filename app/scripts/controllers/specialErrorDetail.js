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
        $scope.editError = editErrors[editType][editId];
        $scope.siblingEdits = Object.keys(editErrors[editType]).sort();
        $scope.selectedEditId = editId;
    } else {
        $scope.editError = {};
    }

    if (editId === 'Q595') {
        $scope.checkboxes = [];
        for (var i = 1; i <= $scope.editError.errors.length; i++) {
            $scope.checkboxes[i] = false;
        }
    }

    $scope.pageSize = $scope.pageSize || 10;
    $scope.currentPage = $scope.currentPage || 1;

    $scope.start = function() {
        return ($scope.currentPage-1) * $scope.pageSize + 1;
    };

    $scope.end = function() {
        var end = $scope.currentPage * $scope.pageSize;
        return end > $scope.total() ? $scope.total() : end;
    };

    $scope.total = function() {
        return ($scope.editError && $scope.editError.errors) ? $scope.editError.errors.length : 0;
    };

    $scope.totalPages = function() {
        return Math.ceil($scope.total() / $scope.pageSize);
    };

    $scope.hasPrev = function() {
        return $scope.currentPage > 1;
    };

    $scope.onPrev = function() {
        $scope.currentPage--;
    };

    $scope.hasNext = function() {
        return $scope.currentPage < $scope.totalPages();
    };

    $scope.onNext = function() {
        $scope.currentPage++;
    };

    $scope.isLastPage = function() {
        return $scope.currentPage === $scope.totalPages();
    };

    $scope.setCurrentPage = function(page) {
        $scope.currentPage = page;
    };

    $scope.setPageSize = function(pageSize) {
        $scope.pageSize = pageSize;
        $scope.currentPage = 1;
    };

    $scope.showPagination = function() {
        return $scope.totalPages() !== 1;
    };

    $scope.backToSummary = function() {
        $location.path('/summaryMSA-IRS');
    };

    $scope.goToEditDetail = function() {
        $location.path('/detail/' + editType + '/' + $scope.selectedEditId);
    };

    $scope.saveSpecialVerification = function(response) {
        console.log(response);
        if (response && response.selected) {
            console.log('add to verified ' + editId + ' reason ' + response.selected);
            Session.addToVerifiedSpecialEdits(editId, response.selected);
        } else {
            console.log('remove from verified ' + editId);
            Session.removeVerifiedSpecialEdit(editId);
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

    $scope.selectAll = function() {
        if ($scope.allSelected()) {
            for (var i = $scope.start(); i <= $scope.end(); i++) {
                $scope.checkboxes[i] = false;
            }
        } else {
            for (var j = $scope.start(); j <= $scope.end(); j++) {
                $scope.checkboxes[j] = true;
            }
        }
    };

    $scope.allSelected = function() {
        for (var i = $scope.start(); i <= $scope.end(); i++) {
            if ($scope.checkboxes[i] === false) {
                return false;
            }
        }
        return true;
    };
};
