'use strict';

require('angular');
require('angular-mocks');

describe('Controller: SummarySyntacticalValidityCtrl', function () {

    var scope,
        location,
        controller,
        Q,
        Wizard,
        mockErrors = {
            syntactical: {},
            validity: {}
        },
        mockEngine = {
            getErrors: function() { return mockErrors; },
            getRuleYear: function() { return '2015'; },
            runQuality: function(year, next) { return next(null); },
            runMacro: function(year, next) { return next(null); }
        };

    beforeEach(angular.mock.module('hmdaPilotApp'));

    beforeEach(inject(function ($rootScope, $location, $controller, $q, _Wizard_) {
        scope = $rootScope.$new();
        location = $location;
        controller = $controller;
        Q = $q;
        Wizard = _Wizard_;
        Wizard.initSteps();
        $controller('SummarySyntacticalValidityCtrl', {
            $scope: scope,
            $location: location,
            HMDAEngine: mockEngine,
            Wizard: _Wizard_
        });
    }));

    it('should include the syntactical errors in the scope', function () {
        expect(scope.syntacticalErrors).toEqual({});
    });

    it('should include the validity errors in the scope', function () {
        expect(scope.validityErrors).toEqual({});
    });

    describe('hasNext()', function() {
        describe('when there are no edit errors', function() {
            it('should return true', function () {
                mockErrors.syntactical = {};
                mockErrors.validity = {};
                controller('SummarySyntacticalValidityCtrl', {
                    $scope: scope,
                    $location: location,
                    HMDAEngine: mockEngine
                });

                expect(scope.hasNext()).toBeTruthy();
            });
        });

        describe('when there are syntactical errors', function() {
            it('should return false', function () {
                mockErrors.syntactical = {error: 'test'};
                mockErrors.validity = {};
                controller('SummarySyntacticalValidityCtrl', {
                    $scope: scope,
                    $location: location,
                    HMDAEngine: mockEngine
                });

                expect(scope.hasNext()).toBeFalsy();
            });
        });

        describe('when there are validity errors', function() {
            it('should return false', function () {
                mockErrors.syntactical = {};
                mockErrors.validity = {error: 'test'};
                controller('SummarySyntacticalValidityCtrl', {
                    $scope: scope,
                    $location: location,
                    HMDAEngine: mockEngine
                });

                expect(scope.hasNext()).toBeFalsy();
            });
        });
    });

    describe('process()', function() {
        describe('when runQuality has a runtime error', function() {
            it('should display a global error', function() {
                mockEngine.runQuality = function() { return Q.reject(new Error('error')); };
                mockEngine.runMacro = function() { return; };
                controller('SummarySyntacticalValidityCtrl', {
                    $scope: scope,
                    $location: location,
                    $q: Q,
                    HMDAEngine: mockEngine
                });
                scope.process();
                scope.$digest();

                expect(scope.errors.global).toBe('error');
            });
        });

        describe('when runMacro has a runtime error', function() {
            it('should display a global error', function() {
                mockEngine.runQuality = function() { return; };
                mockEngine.runMacro = function() { return Q.reject(new Error('error')); };
                controller('SummarySyntacticalValidityCtrl', {
                    $scope: scope,
                    $location: location,
                    $q: Q,
                    HMDAEngine: mockEngine
                });
                scope.process();
                scope.$digest();

                expect(scope.errors.global).toBe('error');
            });
        });

        describe('when runQuality and runMacro have no runtime errors', function() {
            beforeEach(function() {
                mockEngine.runQuality = function() { return; };
                mockEngine.runMacro = function() { return; };
                controller('SummarySyntacticalValidityCtrl', {
                    $scope: scope,
                    $location: location,
                    $q: Q,
                    HMDAEngine: mockEngine
                });
                scope.process();
                scope.$digest();
            });

            it('should mark the current step in the wizard as complete', function () {
                var steps = Wizard.getSteps();
                expect(steps[0].isActive).toBeFalsy();
                expect(steps[0].status).toBe('complete');
            });

            it('should direct the user to the /summaryQualityMacro page', function () {
                expect(location.path()).toBe('/summaryQualityMacro');
            });
        });
    });

    describe('previous()', function () {
        beforeEach(function() {
            scope.previous();
            scope.$digest();
        });

        it('should direct the user to the home (/) page', function () {
            expect(location.path()).toBe('/');
        });
    });
});
