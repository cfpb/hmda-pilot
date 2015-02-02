'use strict';

require('angular');
require('angular-mocks');

describe('Controller: SelectFileCtrl', function () {

    var scope,
        location,
        FileMetadata,
        FileReader,
        HMDAEngine;

    beforeEach(angular.mock.module('hmdaPilotApp'));

    beforeEach(inject(function ($rootScope, $location, $controller, _FileMetadata_, _FileReader_, _HMDAEngine_) {
        scope = $rootScope.$new();
        location = $location;
        FileMetadata = _FileMetadata_;
        FileReader = _FileReader_;
        HMDAEngine = _HMDAEngine_;

        $controller('SelectFileCtrl', {
            $scope: scope,
            $location: location,
            FileMetadata: _FileMetadata_,
            FileReader: _FileReader_,
            HMDAEngine: _HMDAEngine_
        });
    }));

    describe('Initial state', function () {
        it('should include a list of reporting years', function () {
            expect(scope.reportingYears.length).toBe(2);
        });

        it('should default the HMDA filing year to current reporting year - 1', function() {
            expect(scope.hmdaData.year).toBe('2013');
        });

        it('should include an empty errors object', function () {
            expect(scope.errors).toBeDefined();
            expect(scope.errors).toEqual({});
        });

        it('should set the isProcessing flag to false', function () {
            expect(scope.isProcessing).toBeFalsy();
        });
    });

    describe('getFile()', function() {

    });

    describe('submit()', function() {
        // Nothing really to test yet...
    });
});
