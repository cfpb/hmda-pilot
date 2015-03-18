'use strict';

/**
 * @ngdoc directive
 * @name hmdaPilotApp.directive:Pagination
 * @description
 * # Pagination directive
 * Directive for displaying the pagination
 */
module.exports = /*@ngInject*/ function () {

    return {
        restrict: 'E',
        template: '<div ng-transclude></div>',
        transclude: true,
        controller: 'PaginationCtrl',
        link: function(scope) {
            if (angular.equals({}, scope.error)) {
                scope.error = null;
            }
        }
    };
};
