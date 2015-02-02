'use strict';

require('angular');
require('angular-mocks');

describe('Controller: SummarySyntacticalValidityCtrl', function () {

    var scope,
        location,
        controller,
        Wizard,
        mockEngine,
        mockErrors = {
            syntactical: {},
            validity: {}
        };

    beforeEach(angular.mock.module('hmdaPilotApp'));

    beforeEach(inject(function ($rootScope, $location, $controller, _Wizard_) {
        scope = $rootScope.$new();
        location = $location;
        controller = $controller;
        Wizard = _Wizard_;
        mockEngine = {
            getErrors: function() {
                return mockErrors;
            }
        };
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

    describe('next()', function() {
        beforeEach(function() {
            scope.next();
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
