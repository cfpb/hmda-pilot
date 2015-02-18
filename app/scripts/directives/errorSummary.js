'use strict';

/**
 * @ngdoc directive
 * @name hmdaPilotApp.directive:ErrorSummary
 * @description
 * # Error Summary directive
 * Directive for displaying a summary of edit errors
 */
module.exports = /*@ngInject*/ function () {

    function link(scope) {
        if (angular.equals({}, scope.errors)) {
            scope.errors = null;
        }
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
        templateUrl: 'partials/errorSummary.html',
        scope: {
            editType: '@type',
            errors: '='
        },
        link: link,
        controller: /*@ngInject*/ controller
    };
};
