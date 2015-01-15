'use strict';

require('angular');
require('angular-mocks');

describe('Controller: SelectFileCtrl', function () {

    var scope,
        location,
        RuleEngine,
        FileReader,
        HMDAEngine;

    beforeEach(angular.mock.module('hmdaPilotApp'));

    beforeEach(inject(function ($rootScope, $location, $controller, _RuleEngine_, _FileReader_, _HMDAEngine_) {
        scope = $rootScope.$new();
        location = $location;
        RuleEngine = _RuleEngine_;
        FileReader = _FileReader_;
        HMDAEngine = _HMDAEngine_;

        $controller('SelectFileCtrl', {
            $scope: scope,
            $location: location,
            RuleEngine: _RuleEngine_,
            FileReader: _FileReader_,
            HMDAEngine: _HMDAEngine_
        });
    }));

    describe('Initial state', function () {
        it('should include a list of reporting years', function () {
            expect(scope.reportingYears.length).toBe(2);
        });

        it('should default the HMDA filing year to current reporting year - 1', function() {
            expect(scope.reportingYears[0]).toBe('2014');
            expect(scope.hmdaData.year).toBe('2013');
        });

        it('should include an empty errors object', function () {
            expect(scope.errors).toBeDefined();
            expect(scope.errors).toEqual({});
        });
    });

    describe('Form Submission', function() {
        // Nothing really to test yet...
    });
});
