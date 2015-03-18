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
});
