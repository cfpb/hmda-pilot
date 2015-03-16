'use strict';

require('angular');
require('angular-mocks');

describe('Controller: SpecialErrorDetailCtrl', function () {

    var scope,
        location,
        Session,
        mockEngine = {
            getErrors: function() { return mockErrors; }
        },
        mockErrors = {"special": {"Q595": {"scope": "hmda", "explanation": "Q595 explanation", "description": "Q595 description", "errors": [], "action": "Verify"}, //jshint ignore:line
            "Q029": {"scope": "hmda", "explanation": "Q029 explanation", "description": "Q029 description", "errors": [], "action": "Verify"}}}; //jshint ignore:line

    beforeEach(angular.mock.module('hmdaPilotApp'));

    for (var i = 0; i < 10; i++) {
        mockErrors.special.Q595.errors.push({'LAR Count': 2, 'MSA/MD': '1000' + i, 'MSA/MD name': 'metro area'});
        mockErrors.special.Q029.errors.push({'LAR number': '2101023112' + i, 'Recommended MSA/MD': '1000' + i, 'Reported Census Tract': 'census tract'});
    }

    describe('checkAll()', function() {
        beforeEach(inject(function ($rootScope, $location, $controller, _Session_) {
            scope = $rootScope.$new();
            location = $location;
            Session = _Session_;

            $controller('SpecialErrorDetailCtrl', {
                $scope: scope,
                $routeParams: { EditId: 'Q595' },
                $location: location,
                HMDAEngine: mockEngine,
                Session: _Session_
            });
        }));

        it('should check all checkboxes when none are checked', function() {
            expect(scope.allChecked()).toBeFalsy();
            scope.checkAll();
            expect(scope.allChecked()).toBeTruthy();
        });

        it('should uncheck all checkboxes when all checkboxes are already checked', function() {
            for (var i = 1; i <= 10; i++) {
                scope.checkboxes[i] = true;
            }
            expect(scope.allChecked()).toBeTruthy();
            scope.checkAll();
            expect(scope.allChecked()).toBeFalsy();
        });

        it('should check the rest of the checkboxes when some are already checked', function() {
            for (var i = 3; i <= 6; i++) {
                scope.checkboxes[i] = true;
            }
            expect(scope.allChecked()).toBeFalsy();
            scope.checkAll();
            expect(scope.allChecked()).toBeTruthy();
        });
    });

    describe('selectAll()', function() {
        beforeEach(inject(function ($rootScope, $location, $controller, _Session_) {
            scope = $rootScope.$new();
            location = $location;
            Session = _Session_;

            $controller('SpecialErrorDetailCtrl', {
                $scope: scope,
                $routeParams: { EditId: 'Q029' },
                $location: location,
                HMDAEngine: mockEngine,
                Session: _Session_
            });
        }));

        it('should select all the selects when changed', function() {
            for (var i = 1; i <= 10; i++) {
                expect(scope.selects[i]).toBe('0');
            }
            scope.selectAll('1');
            for (i = 1; i <= 10; i++) {
                expect(scope.selects[i]).toBe('1');
            }
        });
    });
});
