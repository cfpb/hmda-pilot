'use strict';

/**
 * Directive for displaying a summary of edit errors
 *
 * @namespace hmdaPilotApp
 * @module {Directive} ErrorSummary
 */
module.exports = /*@ngInject*/ function() {

    function link(scope) {
        if (angular.equals({}, scope.errors)) {
            scope.errors = null;
        }

        scope.getTemplateUrl = function() {
            if (['quality', 'macro'].indexOf(scope.editType) !== -1) {
                return 'partials/errorSummary-verify.html';
            } else if (scope.editType === 'special') {
                return 'partials/errorSummary-special.html';
            } else {
                return 'partials/errorSummary-count.html';
            }
        };
    }

    function controller($scope, Session) {
        $scope.showErrorCount = function() {
            return ['syntactical', 'validity'].indexOf($scope.editType) !== -1;
        };

        $scope.isVerified = function(id) {
            return Session.isVerified(id);
        };
    }

    return {
        restrict: 'E',
        template: '<div ng-include="getTemplateUrl()"></div>',
        scope: {
            editType: '@type',
            errors: '='
        },
        link: link,
        controller: /*@ngInject*/ controller
    };
};
