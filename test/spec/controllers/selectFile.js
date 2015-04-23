'use strict';

require('angular');
require('angular-mocks');

describe('Controller: SelectFileCtrl', function() {

    var controller,
        scope,
        location,
        timeout,
        Q,
        ngDialog,
        Wizard,
        FileMetadata,
        HMDAEngine,
        mockEngine = {
            getValidYears: function() { return ['2013', '2014']; },
            clearHmdaJson: function() { return {}; },
            clearErrors: function() { return {}; },
            clearProgress: function() { return {}; },
            fileToJson: function(file, year, next) { return next(null); },
            runSyntactical: function() { return; },
            runValidity: function() { return; },
            getDebug: function() { return false; },
            setUseLocalDB: function() { },
            destroyDB: function() { return; }
        };

    beforeEach(angular.mock.module('hmdaPilotApp'));

    describe('When there is no session cookie', function() {

        beforeEach(inject(function($templateCache) {
            var directiveTemplate = null;
            var templateId = 'partials/login.html';
            var req = new XMLHttpRequest();
            req.onload = function() {
                directiveTemplate = this.responseText;
            };
            req.open('get', '/base/app/' + templateId, false);
            req.send();
            $templateCache.put(templateId, directiveTemplate);
        }));

        beforeEach(inject(function($rootScope, $location, $controller, $timeout, _Wizard_, _FileMetadata_, _Configuration_, _ngDialog_) {
            scope = $rootScope.$new();
            controller = $controller;
            location = $location;
            timeout = $timeout;
            Wizard = _Wizard_;
            FileMetadata = _FileMetadata_;
            ngDialog = _ngDialog_;
            HMDAEngine = mockEngine;

            spyOn(ngDialog, 'open');

            controller('SelectFileCtrl', {
                $scope: scope,
                $location: location,
                $timeout: timeout,
                Wizard: _Wizard_,
                FileMetadata: _FileMetadata_,
                HMDAEngine: mockEngine,
                ngDialog: _ngDialog_,
                Configuration: _Configuration_
            });
        }));

        describe('Initial state', function() {
            it('should open login ngdialog', function() {
                expect(ngDialog.open).toHaveBeenCalled();
            });
        });
    });

    describe('When has valid session cookie', function() {

        beforeEach(inject(function($templateCache, $cookieStore) {
            $cookieStore.put('validSession', 'true');
            var directiveTemplate = null;
            var templateId = 'partials/progressBar.html';
            var req = new XMLHttpRequest();
            req.onload = function() {
                directiveTemplate = this.responseText;
            };
            req.open('get', '/base/app/' + templateId, false);
            req.send();
            $templateCache.put(templateId, directiveTemplate);
        }));

        beforeEach(inject(function($rootScope, $location, $controller, $q, $timeout, _Wizard_, _FileMetadata_, _Configuration_, _ngDialog_) {
            scope = $rootScope.$new();
            controller = $controller;
            location = $location;
            Q = $q;
            timeout = $timeout;
            Wizard = _Wizard_;
            FileMetadata = _FileMetadata_;
            ngDialog = _ngDialog_;
            HMDAEngine = mockEngine;

            spyOn(HMDAEngine, 'destroyDB');

            controller('SelectFileCtrl', {
                $scope: scope,
                $location: location,
                $timeout: timeout,
                Wizard: _Wizard_,
                FileMetadata: _FileMetadata_,
                HMDAEngine: mockEngine,
                ngDialog: _ngDialog_,
                Configuration: _Configuration_
            });
        }));

        describe('Initial state', function() {
            it('should include a list of reporting years', function() {
                expect(scope.reportingYears.length).toBe(2);
            });

            it('should default the HMDA filing year to current reporting year - 1', function() {
                expect(scope.hmdaData.year).toBe('2013');
            });

            it('should include an empty errors object', function() {
                expect(scope.errors).toBeDefined();
                expect(scope.errors).toEqual({});
            });

            it('should call destroyDB', function() {
                expect(HMDAEngine.destroyDB).toHaveBeenCalled();
            });

            it('should not open the login dialog', function() {
                spyOn(ngDialog, 'open');
                expect(ngDialog.open).not.toHaveBeenCalled();
            });
        });

        describe('getFile()', function() {
            beforeEach(function() {
                scope.file = [];
                scope.file.name = 'test.dat';
                scope.getFile();
                scope.$digest();
            });

            it('should set the filemane value in the in the scope', function() {
                var metadata = FileMetadata.get();
                expect(metadata.filename).toBe('test.dat');
            });
        });

        describe('submit()', function() {

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
                    scope.submit(hmdaData);
                    timeout.flush();
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
                    scope.submit(hmdaData);
                    timeout.flush();
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
                    scope.submit(hmdaData);
                    timeout.flush();
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
                    scope.submit(hmdaData);
                    timeout.flush();
                    scope.$digest();
                });

                it('should mark the current step in the wizard as complete', function() {
                    var steps = Wizard.getSteps();
                    expect(steps[0].isActive).toBeFalsy();
                    expect(steps[0].status).toBe('complete');
                });

                it('should direct the user to the /summarySyntacticalValidity page', function() {
                    expect(location.path()).toBe('/summarySyntacticalValidity');
                });
            });
        });
    });
});
