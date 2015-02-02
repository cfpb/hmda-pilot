'use strict';

require('angular');
require('angular-mocks');

describe('Controller: ErrorDetailCtrl', function () {

    var scope,
        location,
        controller,
        HMDAEngine,
        editType = 'syntactical',
        editId = 'S100',
        mockErrors = {'syntactical': {'S100':'errors for S100'} }; //jshint ignore:line

    beforeEach(angular.mock.module('hmdaPilotApp'));

    beforeEach(inject(function ($controller, $rootScope, $location, _HMDAEngine_) {
        controller = $controller;
        scope = $rootScope.$new();
        location = $location;
        HMDAEngine = _HMDAEngine_;
        HMDAEngine.getErrors = function() { return mockErrors; };

        controller('ErrorDetailCtrl', {
            $scope: scope,
            $routeParams: {
                EditType: editType,
                EditId: editId
            },
            HMDAEngine: HMDAEngine
        });
    }));

    describe('Initial scope', function() {
        it('should set the editType to the value from $routeParams', function() {
            expect(scope.editType).toBe(editType);
        });

        it('should set the editId to the value from $routeParams', function() {
            expect(scope.editId).toBe(editId);
        });

        it('should set the editError for the editType and editId', function() {
            expect(scope.editError).toBe('errors for S100');
        });

        it('should set the editError to an empty object if editType is not found', function() {
            controller('ErrorDetailCtrl', {
                $scope: scope,
                $routeParams: {
                    EditType: 'fail',
                    EditId: 'S100'
                },
                HMDAEngine: HMDAEngine
            });
            expect(scope.editError).toEqual({});
        });

        it('should set the editError to an empty object if editId is not found', function() {
            controller('ErrorDetailCtrl', {
                $scope: scope,
                $routeParams: {
                    EditType: 'syntactical',
                    EditId: 'S999'
                },
                HMDAEngine: HMDAEngine
            });
            expect(scope.editError).toEqual({});
        });
    });

    describe('backToSummary()', function() {
        describe('when editType is "syntactical"', function() {
            it('should direct the user to the summarySyntacticalValidity page', function() {
                scope.backToSummary();
                scope.$digest();
                expect(location.path()).toBe('/summarySyntacticalValidity');
            });
        });

        describe('when editType is "validity"', function() {
            it('should direct the user to the summarySyntacticalValidity page', function() {
                controller('ErrorDetailCtrl', {
                    $scope: scope,
                    $routeParams: {
                        EditType: 'validity',
                        EditId: 'S999'
                    },
                    HMDAEngine: HMDAEngine
                });

                scope.backToSummary();
                scope.$digest();
                expect(location.path()).toBe('/summarySyntacticalValidity');
            });
        });

        describe('when editType doesn\'t match a known type', function() {
            it('should direct the user to the home(/) page', function() {
                controller('ErrorDetailCtrl', {
                    $scope: scope,
                    $routeParams: {
                        EditType: 'test',
                        EditId: 'S999'
                    },
                    HMDAEngine: HMDAEngine
                });

                scope.backToSummary();
                scope.$digest();
                expect(location.path()).toBe('/');
            });
        });
    });

    describe('goToEditDetail()', function() {
        it('should redirect the user to a specific error detail page', function() {
            scope.selectedEditId = 'V100';
            scope.goToEditDetail();
            scope.$digest();
            expect(location.path()).toBe('/detail/syntactical/V100');
        });
    });
});
