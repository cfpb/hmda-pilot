'use strict';

/**
 * Provides the scope and functions for the {@link pagination} directive.
 *
 * @namespace hmdaPilotApp
 * @module {Controller} Pagination
 */
module.exports = /*@ngInject*/ function($scope, $element, $timeout) {
    $scope.$parent.paginate = {
        currentPage: 1,
        pageSize: 10
    };

    var $table = null;
    $timeout(function() {
        $table = $element.find('table');
        $table.attr('tabindex', '-1');
    }, 200);

    $scope.$watch(function() {
        return $scope.isLastPage();
    }, function(isLastPage) {
        if (isLastPage) {
            // Tragic but each of the different places this is used is in a different scope...
            $scope.canVerify = true;
            $scope.$parent.canVerify = true;
            if ($scope.$parent.$parent) {
                $scope.$parent.$parent.canVerify = true;
            }
        }
    });

    $scope.selectAll = function(selectedAnswer) {
        for (var i = $scope.start() - 1; i < $scope.end(); i++) {
            $scope.error.errors[i].properties.select = selectedAnswer;
        }
    };

    $scope.checkAll = function() {
        if ($scope.allChecked()) {
            for (var i = $scope.start() - 1; i < $scope.end(); i++) {
                $scope.error.errors[i].properties.checkbox = false;
            }
        } else {
            for (var j = $scope.start() - 1; j < $scope.end(); j++) {
                $scope.error.errors[j].properties.checkbox = true;
            }
        }
    };

    $scope.allChecked = function() {
        for (var i = $scope.start() - 1; i < $scope.end(); i++) {
            if ($scope.error.errors[i].properties.checkbox === false) {
                return false;
            }
        }
        return true;
    };

    $scope.start = function() {
        return ($scope.$parent.paginate.currentPage - 1) * $scope.$parent.paginate.pageSize + 1;
    };

    $scope.end = function() {
        var end = $scope.$parent.paginate.currentPage * $scope.$parent.paginate.pageSize;
        return end > $scope.total() ? $scope.total() : end;
    };

    $scope.total = function() {
        return ($scope.error && $scope.error.errors) ? $scope.error.errors.length : 0;
    };

    $scope.totalPages = function() {
        return Math.ceil($scope.total() / $scope.$parent.paginate.pageSize);
    };

    $scope.hasPrev = function() {
        return $scope.$parent.paginate.currentPage > 1;
    };

    $scope.onPrev = function() {
        $scope.$parent.paginate.currentPage--;
        $table[0].focus();
    };

    $scope.hasNext = function() {
        return $scope.$parent.paginate.currentPage < $scope.totalPages();
    };

    $scope.onNext = function() {
        $scope.$parent.paginate.currentPage++;
        $table[0].focus();
    };

    $scope.isLastPage = function() {
        return $scope.$parent.paginate.currentPage === $scope.totalPages();
    };

    $scope.currentPage = function(page) {
        if (angular.isDefined(page)) {
            $scope.$parent.paginate.currentPage = page > $scope.totalPages() ? $scope.totalPages() : page;
        } else {
            return $scope.$parent.paginate.currentPage;
        }
    };

    $scope.setPageSize = function(size) {
        $scope.$parent.paginate.pageSize = size;
        $scope.$parent.paginate.currentPage = 1;
    };

    $scope.showPagination = function() {
        return $scope.totalPages() !== 1;
    };
};
