'use strict';

require('angular');
require('angular-mocks');

describe('Controller: LoginCtrl', function () {

    var scope,
        timeout,
        Session;

    beforeEach(angular.mock.module('hmdaPilotApp'));

    beforeEach(inject(function ($rootScope, $controller, $timeout, _Session_) {
        scope = $rootScope.$new();
        timeout = $timeout;
        Session = _Session_;
        scope.closeThisDialog = function() { return; };

        spyOn(scope, 'closeThisDialog');

        $controller('LoginCtrl', {
            $scope: scope,
            Session: _Session_
        });
    }));

    describe('initial scope', function() {
        it('should set the password to blank string', function() {
            expect(scope.password).toBe('');
        });
        it('should set the loginError to blank string', function() {
            expect(scope.loginError).toBe('');
        });
        it('should set the showTerms to false', function() {
            expect(scope.showTerms).toBeFalsy();
        });
    });

    describe('login()', function() {
        it('should close the dialog when password is valid', function() {
            scope.password = 'p1l0t';
            scope.login();
            expect(scope.closeThisDialog).toHaveBeenCalled();
        });

        it('should set an error and clear password model when password is invalid', function() {
            scope.password = 'password';
            scope.login();
            expect(scope.password).toBe('');
            timeout.flush();
            expect(scope.loginError).toBe('Invalid password');
        });
    });

    describe('toggleTerms()', function() {
        it('toggling when false should set showTerms to true', function() {
            scope.showTerms = false;
            scope.toggleTerms();
            expect(scope.showTerms).toBeTruthy();
        });

        it('toggling when true should set showTerms to false', function() {
            scope.showTerms = true;
            scope.toggleTerms();
            expect(scope.showTerms).toBeFalsy();
        });
    });

});
