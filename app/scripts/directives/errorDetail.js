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
            editType: '@type'
        },
        link: function(scope) {
            if (angular.equals({}, scope.error)) {
                scope.error = null;
            }

            scope.getTemplateUrl = function() {
                if (scope.editType === 'macro') {
                    return 'partials/errorDetail-macro.html';
                } else {
                    return 'partials/errorDetail.html';
                }
            };
        }
    };
};
