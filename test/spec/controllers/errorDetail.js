'use strict';

require('angular');
require('angular-mocks');

describe('Controller: ErrorDetailCtrl', function () {

    var scope,
        location,
        controller,
        HMDAEngine,
        editType = 'test',
        editId = 1,
        mockErrors = {'test': {'1':'errors for 1'} }; //jshint ignore:line

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
        it('should set the editId to the value from $routeParams', function() {
            expect(scope.editId).toBe(editId);
        });

        it('should set the editError for the editType and editId', function() {
            expect(scope.editError).toBe('errors for 1');
        });

        it('should set the editError to an empty object if editType is not found', function() {
            controller('ErrorDetailCtrl', {
                $scope: scope,
                $routeParams: {
                    EditType: 'fail',
                    EditId: 1
                },
                HMDAEngine: HMDAEngine
            });
            expect(scope.editError).toEqual({});
        });

        it('should set the editError to an empty object if editId is not found', function() {
            controller('ErrorDetailCtrl', {
                $scope: scope,
                $routeParams: {
                    EditType: 'test',
                    EditId: 999
                },
                HMDAEngine: HMDAEngine
            });
            expect(scope.editError).toEqual({});
        });
    });
});
