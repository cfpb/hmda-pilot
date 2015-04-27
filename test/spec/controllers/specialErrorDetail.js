'use strict';

require('angular');
require('angular-mocks');

describe('Controller: SpecialErrorDetailCtrl', function() {

    var scope,
        location,
        Session,
        mockEngine = {
            getErrors: function() { return mockErrors; }
        },
        mockErrors = {special: {Q595: {scope: 'hmda', explanation: 'Q595 explanation', description: 'Q595 description', errors: [], action: 'Verify'},
            Q029: {scope: 'hmda', explanation: 'Q029 explanation', description: 'Q029 description', errors: [], action: 'Verify'}}};

    for (var i = 0; i < 10; i++) {
        mockErrors.special.Q595.errors.push({properties: {'LAR Count': 2, 'MSA/MD': '1000' + i, 'MSA/MD name': 'metro area'}});
        mockErrors.special.Q029.errors.push({properties: {'LAR number': '2101023112' + i, 'Recommended MSA/MD': '1000' + i, 'Reported Census Tract': 'census tract'}});
    }

    beforeEach(angular.mock.module('hmdaPilotApp'));

    beforeEach(inject(function($rootScope, $location, $controller, _Session_) {
        scope = $rootScope.$new();
        scope.paginate = {};
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
        it('should set checkboxes based on the session if Q595 is already verified', inject(function($controller) {
            var states = {};
            for (var i = 0; i < 3; i++) {
                states[scope.error.errors[i].properties['MSA/MD']] = true;
            }
            Session.addToVerifiedSpecialEdits('Q595', states);
            $controller('SpecialErrorDetailCtrl', {
                $scope: scope,
                $routeParams: { EditId: 'Q595' },
                HMDAEngine: mockEngine,
                Session: Session
            });

            for (i = 0; i < 3; i++) {
                expect(scope.error.errors[i].properties.checkbox).toBeTruthy();
            }
        }));

        it('should set checkboxes to false if Q595 is not verified', inject(function($controller) {
            $controller('SpecialErrorDetailCtrl', {
                $scope: scope,
                $routeParams: { EditId: 'Q595' },
                HMDAEngine: mockEngine,
                Session: Session
            });

            for (var i = 0; i < scope.error.errors.length; i++) {
                expect(scope.error.errors[i].properties.checkbox).toBeFalsy();
            }
        }));

        it('should set selects based on the session if Q029 is already verified', inject(function($controller) {
            var states = {};
            for (var i = 0; i < 3; i++) {
                states[mockEngine.getErrors().special.Q029.errors[i].properties['LAR number']] = '1';
            }
            Session.addToVerifiedSpecialEdits('Q029', states);
            $controller('SpecialErrorDetailCtrl', {
                $scope: scope,
                $routeParams: { EditId: 'Q029' },
                HMDAEngine: mockEngine,
                Session: Session
            });

            for (i = 0; i < 3; i++) {
                expect(scope.error.errors[i].properties.select).toEqual('1');
            }
        }));

        it('should set selects to \'0\' if Q029 is not verified', inject(function($controller) {
            $controller('SpecialErrorDetailCtrl', {
                $scope: scope,
                $routeParams: { EditId: 'Q029' },
                HMDAEngine: mockEngine,
                Session: Session
            });

            for (i = 0; i < scope.error.errors.length; i++) {
                expect(scope.error.errors[i].properties.select).toEqual('0');
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

    describe('saveSpecialVerification()', function() {
        it('should store the checkboxes in the session for Q595', function() {
            scope.saveSpecialVerification();
            var reasons = Session.getVerifiedReasonByEditId('Q595');
            for (var i = 0; i < scope.error.errors.length; i++) {
                expect(reasons[scope.error.errors[i].properties['MSA/MD']]).toBeFalsy();
            }
        });

        it('should store the selects in the session for Q029', inject(function($controller) {
            $controller('SpecialErrorDetailCtrl', {
                $scope: scope,
                $routeParams: { EditId: 'Q029' },
                HMDAEngine: mockEngine,
                Session: Session
            });
            scope.saveSpecialVerification();
            var reasons = Session.getVerifiedReasonByEditId('Q029');
            for (var i = 0; i < scope.error.errors.length; i++) {
                expect(reasons[scope.error.errors[i].properties['LAR number']]).toEqual('0');
            }
        }));
    });

    describe('sort()', function() {
        it('should order the scope errors by a property in ascending order when sorted once', function() {
            scope.sort('properties[\'MSA/MD\']');
            for (var i = 0; i < scope.error.errors.length - 1; i++) {
                expect(+scope.error.errors[i].properties['MSA/MD']).toBeLessThan(+scope.error.errors[i + 1].properties['MSA/MD']);
            }
        });

        it('should order the scope errors by a property in descending order when sorted twice', function() {
            scope.sort('properties[\'MSA/MD\']');
            scope.sort('properties[\'MSA/MD\']');
            for (var i = 0; i < scope.error.errors.length - 1; i++) {
                expect(+scope.error.errors[i].properties['MSA/MD']).toBeGreaterThan(+scope.error.errors[i + 1].properties['MSA/MD']);
            }
        });

        it('should reset pagination to the first page', function() {
            scope.paginate.currentPage = 4;
            scope.sort('foo');
            expect(scope.paginate.currentPage).toEqual(1);
        });
    });

    describe('isSortBy()', function() {
        it('should return \'none\' if not sorted by the given property', function() {
            scope.sort('foo');
            expect(scope.isSortedBy('bar')).toEqual('none');
        });

        it('should return \'ascending\' if sorted by the given property and sortAsc', function() {
            scope.sort('foo');
            expect(scope.isSortedBy('foo')).toEqual('ascending');
        });

        it('should return \'descending\' if sorted by the given property and not sortAsc', function() {
            scope.sort('foo');
            scope.sort('foo');
            expect(scope.isSortedBy('foo')).toEqual('descending');
        });
    });

    describe('isSortedUp()', function() {
        it('should return true if sorted by the property and descending', function() {
            scope.sort('foo');
            expect(scope.isSortedUp('foo')).toBeTruthy();
        });

        it('should return false if sorted by the property and ascending', function() {
            scope.sort('foo');
            scope.sort('foo');
            expect(scope.isSortedUp('foo')).toBeFalsy();
        });

        it('should return false if not sorted by the property', function() {
            scope.sort('bar');
            expect(scope.isSortedUp('foo')).toBeFalsy();
        });
    });

    describe('isSortedDown()', function() {
        it('should return true if sorted by the property and ascending', function() {
            scope.sort('foo');
            scope.sort('foo');
            expect(scope.isSortedDown('foo')).toBeTruthy();
        });

        it('should return false if sorted by the property and descending', function() {
            scope.sort('foo');
            expect(scope.isSortedDown('foo')).toBeFalsy();
        });

        it('should return false if not sorted by the property', function() {
            scope.sort('bar');
            expect(scope.isSortedDown('foo')).toBeFalsy();
        });
    });
});
