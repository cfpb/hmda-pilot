'use strict';

require('angular');
require('angular-mocks');

describe('Controller: SummaryQualityMacroCtrl', function() {

    var scope,
        location,
        controller,
        timeout,
        Q,
        Wizard,
        Session,
        mockErrors = {
            quality: {},
            macro: {},
            special: {}
        },
        mockEngine = {
            getErrors: function() { return mockErrors; },
            getRuleYear: function() { return '2015'; },
            runSpecial: function(year, next) { return next(null); },
            getDebug: function() { return false; },
            clearProgress: function() { return {}; }
        };

    beforeEach(angular.mock.module('hmdaPilotApp'));

    beforeEach(inject(function($templateCache) {
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

    beforeEach(inject(function($rootScope, $location, $controller, $q, $timeout, _Wizard_, _Session_, _ngDialog_, _Configuration_) {
        scope = $rootScope.$new();
        location = $location;
        controller = $controller;
        timeout = $timeout;
        Q = $q;
        Wizard = _Wizard_;
        Session = _Session_;

        Wizard.initSteps();

        $controller('SummaryQualityMacroCtrl', {
            $scope: scope,
            $location: location,
            $timeout: timeout,
            HMDAEngine: mockEngine,
            Wizard: _Wizard_,
            Session: _Session_,
            ngDialog: _ngDialog_,
            Configuration: _Configuration_
        });
    }));

    it('should include the quality errors in the scope', function() {
        expect(scope.data.qualityErrors).toEqual({});
    });

    it('should include the macro errors in the scope', function() {
        expect(scope.data.macroErrors).toEqual({});
    });

    describe('hasNext()', function() {
        describe('when there are no unvalidated errors', function() {
            it('should return true', function() {
                mockErrors.quality = {};
                mockErrors.macro = {};
                controller('SummaryQualityMacroCtrl', {
                    $scope: scope,
                    $location: location,
                    HMDAEngine: mockEngine
                });

                expect(scope.hasNext()).toBeTruthy();
            });
        });

        describe('when there are unvalidated quality errors', function() {
            it('should return false', function() {
                mockErrors.quality = {Q100: 'test'};
                mockErrors.macro = {};
                controller('SummaryQualityMacroCtrl', {
                    $scope: scope,
                    $location: location,
                    HMDAEngine: mockEngine,
                    Session: Session
                });

                expect(scope.hasNext()).toBeFalsy();
            });
        });

        describe('when there are unvalidated macro errors', function() {
            it('should return false', function() {
                mockErrors.quality = {};
                mockErrors.macro = {Q100: 'test'};
                controller('SummaryQualityMacroCtrl', {
                    $scope: scope,
                    $location: location,
                    HMDAEngine: mockEngine,
                    Session: Session
                });

                expect(scope.hasNext()).toBeFalsy();
            });
        });

        describe('when quality and macro errors end up null', function() {
            it('should return true', function() {
                scope.data.qualityErrors = null;
                scope.data.macroErrors = null;
                expect(scope.hasNext()).toBeTruthy();
            });
        });
    });

    describe('next()', function() {
        describe('when special edit checks have already been run', function() {
            beforeEach(function() {
                mockErrors.special = {Q029: 'test'};
                controller('SummaryQualityMacroCtrl', {
                    $scope: scope,
                    $location: location,
                    HMDAEngine: mockEngine,
                    Session: Session
                });
            });

            it('should not re-run the process() function', function() {
                spyOn(scope, 'process');
                scope.next();
                scope.$digest();
                expect(scope.process).not.toHaveBeenCalled();
            });

            it('should direct the user to the /summaryMSA-IRS page', function() {
                scope.next();
                scope.$digest();
                expect(location.path()).toBe('/summaryMSA-IRS');
            });
        });

        describe('when runSpecial has a runtime error', function() {
            it('should display a global error', function() {
                mockEngine.runSpecial = function() { return Q.reject(new Error('error')); };
                mockErrors.special = {};
                controller('SummaryQualityMacroCtrl', {
                    $scope: scope,
                    $location: location,
                    $q: Q,
                    HMDAEngine: mockEngine
                });
                scope.next();
                timeout.flush();
                scope.$digest();

                expect(scope.errors.global).toBe('error');
            });
        });

        describe('when runSpecial has no runtime errors', function() {
            beforeEach(function() {
                mockEngine.runSpecial = function() { return; };
                mockErrors.special = {};
                controller('SummaryQualityMacroCtrl', {
                    $scope: scope,
                    $location: location,
                    $q: Q,
                    HMDAEngine: mockEngine
                });
                scope.next();
                timeout.flush();
                scope.$digest();
            });

            it('should mark the current step in the wizard as complete', function() {
                var steps = Wizard.getSteps();
                expect(steps[0].isActive).toBeFalsy();
                expect(steps[0].status).toBe('complete');
            });

            it('should direct the user to the /summaryMSA-IRS page', function() {
                expect(location.path()).toBe('/summaryMSA-IRS');
            });
        });
    });

    describe('previous()', function() {
        beforeEach(function() {
            scope.previous();
            scope.$digest();
        });

        it('should direct the user to the /summarySyntacticalValidity page', function() {
            expect(location.path()).toBe('/summarySyntacticalValidity');
        });
    });
});
