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
        template: '<div ng-include="getTemplateUrl()"></div>',
        scope: {
            error: '=',
            editType: '@type',
            editId: '@edit'
        },
        link: function(scope) {
            scope.pageSize = scope.pageSize || 10;
            scope.currentPage = scope.currentPage || 1;

            if (angular.equals({}, scope.error)) {
                scope.error = null;
            }

            if (scope.editId === 'Q595') {
                scope.checkboxes = [];
                for (var i = 1; i <= scope.error.errors.length; i++) {
                    scope.checkboxes[i] = false;
                }
            }

            scope.$watch(function() {
                return scope.isLastPage();
            }, function(isLastPage) {
                if (isLastPage) {
                    scope.$parent.canVerify = true;
                }
            });

            scope.start = function() {
                return (scope.currentPage-1) * scope.pageSize + 1;
            };

            scope.end = function() {
                var end = scope.currentPage * scope.pageSize;
                return end > scope.total() ? scope.total() : end;
            };

            scope.total = function() {
                return (scope.error && scope.error.errors) ? scope.error.errors.length : 0;
            };

            scope.totalPages = function() {
                return Math.ceil(scope.total() / scope.pageSize);
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

            scope.isLastPage = function() {
                return scope.currentPage === scope.totalPages();
            };

            scope.setCurrentPage = function(page) {
                scope.currentPage = page;
            };

            scope.setPageSize = function(pageSize) {
                scope.pageSize = pageSize;
                scope.currentPage = 1;
            };

            scope.showPagination = function() {
                return scope.totalPages() !== 1;
            };

            scope.getTemplateUrl = function() {
                if (scope.editType === 'macro') {
                    return 'partials/errorDetail-macro.html';
                } else if (scope.editId === 'Q029') {
                    return 'partials/errorDetail-Q029.html';
                } else if (scope.editId === 'Q595') {
                    return 'partials/errorDetail-Q595.html';
                } else {
                    return 'partials/errorDetail.html';
                }
            };

            scope.selectAll = function() {
                if (scope.allSelected()) {
                    for (var i = scope.start(); i <= scope.end(); i++) {
                        scope.checkboxes[i] = false;
                    }
                } else {
                    for (var j = scope.start(); j <= scope.end(); j++) {
                        scope.checkboxes[j] = true;
                    }
                }
            };

            scope.allSelected = function() {
                for (var i = scope.start(); i <= scope.end(); i++) {
                    if (scope.checkboxes[i] === false) {
                        return false;
                    }
                }
                return true;
            };
        }
    };
};
