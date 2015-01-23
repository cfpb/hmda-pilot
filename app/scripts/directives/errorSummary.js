'use strict';

/**
 * @ngdoc directive
 * @name hmdaPilotApp.directive:ErrorSummary
 * @description
 * # Error Summary directive
 * Directive for displaying a summary of edit errors
 */
module.exports = /*@ngInject*/ function () {

    return {
        restrict: 'E',
        templateUrl: 'partials/errorSummary.html',
        scope: {
            errors: '='
        },
        link: function(scope) {
            if (angular.equals({}, scope.errors)) {
                scope.errors = null;
            }
        }
    };
};
