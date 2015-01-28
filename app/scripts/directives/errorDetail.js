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
            if (angular.equals({}, scope.error)) {
                scope.error = null;
            }
        }
    };
};
