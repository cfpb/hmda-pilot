'use strict';

require('angular');
require('angular-mocks');

describe('Controller: SelectFileCtrl', function () {

    var controller,
        scope,
        location,
        Q,
        Wizard,
        FileMetadata,
        FileReader,
        HMDAEngine,
        mockEngine = {
            getValidYears: function() { return ['2013', '2014']; },
            clearHmdaJson: function () { return {}; },
            clearErrors: function () { return {}; },
            fileToJson: function(file, year, next) { return next(null); },
            runSyntactical: function() { return; },
            runValidity: function() { return; }
        };


    beforeEach(angular.mock.module('hmdaPilotApp'));

    beforeEach(inject(function ($rootScope, $location, $controller, $q, _Wizard_, _FileMetadata_, _FileReader_) {
        scope = $rootScope.$new();
        controller = $controller;
        location = $location;
        Q = $q;
        Wizard = _Wizard_;
        FileMetadata = _FileMetadata_;
        FileReader = _FileReader_;
        HMDAEngine = mockEngine;

        controller('SelectFileCtrl', {
            $scope: scope,
            $location: location,
            $q: Q,
            Wizard: _Wizard_,
            FileMetadata: _FileMetadata_,
            FileReader: _FileReader_,
            HMDAEngine: mockEngine
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
        beforeEach(function() {
            scope.file = {
                name: 'test.dat'
            };
            scope.getFile();
            scope.$digest();
        });

        it('should set the filemane value in the in the scope', function () {
            var metadata = FileMetadata.get();
            expect(metadata.filename).toBe('test.dat');
        });
    });

    describe('process()', function() {

        var hmdaData = {
            file: 'test.dat',
            year: '2013'
        };

        describe('when fileToJson has a runtime error', function() {
            it('should display a global error', function() {
                mockEngine.fileToJson = function(file, year, next) { return next('error'); };
                mockEngine.runSyntactical = function() { return; };
                mockEngine.runValidity = function() { return; };
                controller('SelectFileCtrl', {
                    $scope: scope,
                    $location: location,
                    $q: Q,
                    HMDAEngine: mockEngine
                });
                scope.process(hmdaData);
                scope.$digest();

                expect(scope.errors.global).toBe('error');
            });
        });

        describe('when runSyntactical has a runtime error', function() {
            it('should display a global error', function() {
                mockEngine.fileToJson = function(file, year, next) { return next(null); };
                mockEngine.runSyntactical = function() { return Q.reject(new Error('error')); };
                mockEngine.runValidity = function() { return; };
                controller('SelectFileCtrl', {
                    $scope: scope,
                    $location: location,
                    $q: Q,
                    HMDAEngine: mockEngine
                });
                scope.process(hmdaData);
                scope.$digest();

                expect(scope.errors.global).toBe('error');
            });
        });

        describe('when runValidity has a runtime error', function() {
            it('should display a global error', function() {
                mockEngine.fileToJson = function(file, year, next) { return next(null); };
                mockEngine.runSyntactical = function() { return; };
                mockEngine.runValidity = function() { return Q.reject(new Error('error')); };
                controller('SelectFileCtrl', {
                    $scope: scope,
                    $location: location,
                    $q: Q,
                    HMDAEngine: mockEngine
                });
                scope.process(hmdaData);
                scope.$digest();

                expect(scope.errors.global).toBe('error');
            });
        });

        describe('when runSyntactical and runValidity have no runtime errors', function() {
            beforeEach(function() {
                mockEngine.runSyntactical = function() { return; };
                mockEngine.runValidity = function() { return; };
                controller('SelectFileCtrl', {
                    $scope: scope,
                    $location: location,
                    $q: Q,
                    HMDAEngine: mockEngine
                });
                scope.process(hmdaData);
                scope.$digest();
            });

            it('should mark the current step in the wizard as complete', function () {
                var steps = Wizard.getSteps();
                expect(steps[0].isActive).toBeFalsy();
                expect(steps[0].status).toBe('complete');
            });

            it('should direct the user to the /summarySyntacticalValidity page', function () {
                expect(location.path()).toBe('/summarySyntacticalValidity');
            });
        });
    });
});
