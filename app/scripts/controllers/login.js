'use strict';

/**
 * Provides the scope and functions for the login modal
 *
 * @namespace hmdaPilotApp
 * @module {Controller} Login
 */
module.exports = /*@ngInject*/ function ($scope, Session) {
    $scope.password = '';
    $scope.loginError = '';
    $scope.showTerms = false;

    $scope.login = function() {
        $scope.loginError = '';
        if (Session.authenticate($scope.password)) {
            $scope.closeThisDialog();
        } else {
            $scope.loginError = 'Invalid password';
            $scope.password = '';
        }
    };

    $scope.toggleTerms = function() {
        $scope.showTerms = !$scope.showTerms;
    };
};
