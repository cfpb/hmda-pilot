'use strict';

/**
 * @ngdoc function
 * @name hmdaPilotApp.controller:PaginationCtrl
 * @description
 * # PaginationCtrl
 * Controller for pagination
 */
module.exports = /*@ngInject*/ function ($scope) {
    $scope.currentPage = 1;
    $scope.pageSize = 10;

    $scope.$watch(function() {
        return $scope.isLastPage();
    }, function(isLastPage) {
        if (isLastPage) {
            $scope.$parent.$parent.canVerify = true;
        }
    });

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

    $scope.start = function() {
        return ($scope.currentPage-1) * $scope.pageSize + 1;
    };

    $scope.end = function() {
        var end = $scope.currentPage * $scope.pageSize;
        return end > $scope.total() ? $scope.total() : end;
    };

    $scope.total = function() {
        return ($scope.error && $scope.error.errors) ? $scope.error.errors.length : 0;
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

    $scope.setPageSize = function(size) {
        $scope.pageSize = size;
        $scope.currentPage = 1;
    };

    $scope.showPagination = function() {
        return $scope.totalPages() !== 1;
    };
};
