'use strict';

require('angular');
require('angular-mocks');

describe('Controller: SummarySyntacticalValidityCtrl', function () {

    var scope,
        location,
        controller,
        mockEngine,
        mockErrors = {
            syntactical: {},
            validity: {}
        };

    beforeEach(angular.mock.module('hmdaPilotApp'));

    beforeEach(inject(function ($rootScope, $location, $controller) {
        scope = $rootScope.$new();
        location = $location;
        controller = $controller;
        mockEngine = {
            getErrors: function() {
                return mockErrors;
            }
        };
        $controller('SummarySyntacticalValidityCtrl', {
            $scope: scope,
            $location: location,
            HMDAEngine: mockEngine
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
        it('should direct the user to the /summaryQualityMacro page', function () {
            scope.next();
            scope.$digest();
            expect(location.path()).toBe('/summaryQualityMacro');
        });
    });
});
