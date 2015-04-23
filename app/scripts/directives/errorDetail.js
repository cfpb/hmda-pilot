'use strict';

/**
 * Display the details of a single edit error.
 *
 * @namespace hmdaPilotApp
 * @module {Directive} ErrorDetail
 */
module.exports = /*@ngInject*/ function() {

    return {
        restrict: 'E',
        template: '<div ng-include="getTemplateUrl()"></div>',
        scope: {
            error: '=',
            editType: '@type',
            editId: '@'
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
