'use strict';

/**
 * @ngdoc directive
 * @name hmdaPilotApp.directive:ErrorDetail
 * @description
 * # Error Summary directive
 * Directive for displaying the details of a single edit error
 */
module.exports = /*@ngInject*/ function () {

    return {
        restrict: 'E',
        templateUrl: 'partials/errorDetail.html',
        scope: {
            error: '='
        },
        link: function(scope) {
            scope.pageSize = scope.pageSize || 10;
            scope.currentPage = scope.currentPage || 1;

            if (angular.equals({}, scope.error)) {
                scope.error = null;
            }

            scope.start = function() {
                return (scope.currentPage-1) * scope.pageSize + 1;
            };

            scope.end = function() {
                var end = scope.currentPage * scope.pageSize;
                return end > scope.total() ? scope.total() : end;
            };

            scope.total = function() {
                return scope.error.errors.length;
            };

            scope.totalPages = function() {
                return parseInt(scope.total() / scope.pageSize) || 1;
            };

            scope.hasPrev = function() {
                return scope.currentPage > 1;
            };

            scope.onPrev = function() {
                scope.currentPage--;
            };

            scope.hasNext = function() {
                return scope.currentPage < scope.totalPages();
            };

            scope.onNext = function() {
                scope.currentPage++;
            };
        }
    };
};
