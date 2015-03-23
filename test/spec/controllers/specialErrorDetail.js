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

    for (var i = 0; i < 10; i++) {
        mockErrors.special.Q595.errors.push({'LAR Count': 2, 'MSA/MD': '1000' + i, 'MSA/MD name': 'metro area'});
        mockErrors.special.Q029.errors.push({'LAR number': '2101023112' + i, 'Recommended MSA/MD': '1000' + i, 'Reported Census Tract': 'census tract'});
    }

    beforeEach(angular.mock.module('hmdaPilotApp'));

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

    describe('backToSummary()', function() {
        it('should direct the user to the MSA-IRS summary page', function() {
            scope.backToSummary();
            scope.$digest();
            expect(location.path()).toBe('/summaryMSA-IRS');
        });
    });

    describe('goToEditDetail()', function() {
        it('should direct the user to the correct edit detail page', function() {
            scope.goToEditDetail();
            scope.$digest();
            expect(location.path()).toBe('/detail/special/Q595');
        });
    });

    describe('initialization', function() {
        it('should set $scope.checkboxes based on the session if Q595 is already verified', inject(function($controller) {
            Session.addToVerifiedSpecialEdits('Q595', [1, 2, 3]);
            $controller('SpecialErrorDetailCtrl', {
                $scope: scope,
                $routeParams: { EditId: 'Q595' },
                HMDAEngine: mockEngine,
                Session: Session
            });

            expect(scope.checkboxes).toEqual([1, 2, 3]);
        }));

        it('should set $scope.checkboxes to false if Q595 is not verified', inject(function($controller) {
            $controller('SpecialErrorDetailCtrl', {
                $scope: scope,
                $routeParams: { EditId: 'Q595' },
                HMDAEngine: mockEngine,
                Session: Session
            });

            for (var i = 1; i < scope.checkboxes.length; i++) {
                expect(scope.checkboxes[i]).toBeFalsy();
            }
        }));

        it('should set $scope.selects based on the session if Q029 is already verified', inject(function($controller) {
            Session.addToVerifiedSpecialEdits('Q029', ['1', '0', '1']);
            $controller('SpecialErrorDetailCtrl', {
                $scope: scope,
                $routeParams: { EditId: 'Q029' },
                HMDAEngine: mockEngine,
                Session: Session
            });

            expect(scope.selects).toEqual(['1', '0', '1']);
        }));

        it('should set $scope.selects to \'0\' if Q029 is not verified', inject(function($controller) {
            $controller('SpecialErrorDetailCtrl', {
                $scope: scope,
                $routeParams: { EditId: 'Q029' },
                HMDAEngine: mockEngine,
                Session: Session
            });

            for (var i = 1; i < scope.selects.length; i++) {
                expect(scope.selects[i]).toEqual('0');
            }
        }));

        it('should set $scope.error to an empty object if given an invalid editId', inject(function($controller) {
            $controller('SpecialErrorDetailCtrl', {
                $scope: scope,
                $routeParams: { EditId: 'Q999' },
                HMDAEngine: mockEngine
            });

            expect(scope.error).toEqual({});
        }));
    });
});
