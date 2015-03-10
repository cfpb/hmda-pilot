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
        mockErrors = {"special": {"Q595": {"scope": "hmda", "explanation": "Q595 explanation", "description": "Q595 description", "errors": [], "action": "Verify"}}}; //jshint ignore:line

    beforeEach(angular.mock.module('hmdaPilotApp'));

    for (var i = 0; i < 10; i++) {
        mockErrors.special.Q595.errors.push({'LAR Count': 2, 'MSA/MD': '1000' + i, 'MSA/MD name': 'metro area'});
    }

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

    describe('selectAll()', function() {
        it('should select all checkboxes when none are selected', function() {
            expect(scope.allSelected()).toBeFalsy();
            scope.selectAll();
            expect(scope.allSelected()).toBeTruthy();
        });

        it('should de-select all checkboxes when all checkboxes are already checked', function() {
            for (var i = 1; i <= 10; i++) {
                scope.checkboxes[i] = true;
            }
            expect(scope.allSelected()).toBeTruthy();
            scope.selectAll();
            expect(scope.allSelected()).toBeFalsy();
        });

        it('should select the rest of the checkboxes when some are already checked', function() {
            for (var i = 3; i <= 6; i++) {
                scope.checkboxes[i] = true;
            }
            expect(scope.allSelected()).toBeFalsy();
            scope.selectAll();
            expect(scope.allSelected()).toBeTruthy();
        });
    });
});
