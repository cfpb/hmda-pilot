'use strict';

require('angular');
require('angular-mocks');

describe('Controller: SummaryQualityMacroCtrl', function () {

    var scope,
        location,
        controller,
        Q,
        Wizard,
        Session,
        mockEngine = {
            getErrors: function() { return mockErrors; },
            getRuleYear: function() { return '2015'; },
            runSpecial: function(year, next) { return next(null); },
            getDebug: function() { return false; }
        },
        mockErrors = {
            quality: {},
            macro: {}
        };

    beforeEach(angular.mock.module('hmdaPilotApp'));

    beforeEach(inject(function ($rootScope, $location, $controller, $q, _Wizard_, _Session_) {
        scope = $rootScope.$new();
        location = $location;
        controller = $controller;
        Q = $q;
        Wizard = _Wizard_;
        Session = _Session_;
        Wizard.initSteps();
        $controller('SummaryQualityMacroCtrl', {
            $scope: scope,
            $location: location,
            HMDAEngine: mockEngine,
            Wizard: _Wizard_,
            Session: _Session_
        });
    }));

    it('should include the quality errors in the scope', function () {
        expect(scope.qualityErrors).toEqual({});
    });

    it('should include the macro errors in the scope', function () {
        expect(scope.macroErrors).toEqual({});
    });

    describe('hasNext()', function() {
        describe('when there are no unvalidated errors', function() {
            it('should return true', function () {
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
            it('should return false', function () {
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
            it('should return false', function () {
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
    });

    describe('process()', function() {
        describe('when runSpecial has a runtime error', function() {
            it('should display a global error', function() {
                mockEngine.runSpecial = function() { return Q.reject(new Error('error')); };
                controller('SummaryQualityMacroCtrl', {
                    $scope: scope,
                    $location: location,
                    $q: Q,
                    HMDAEngine: mockEngine
                });
                scope.process();
                scope.$digest();

                expect(scope.errors.global).toBe('error');
            });
        });

        describe('when runSpecial has no runtime errors', function() {
            beforeEach(function() {
                mockEngine.runSpecial = function() { return; };
                controller('SummaryQualityMacroCtrl', {
                    $scope: scope,
                    $location: location,
                    $q: Q,
                    HMDAEngine: mockEngine
                });
                scope.process();
                scope.$digest();
            });

            it('should mark the current step in the wizard as complete', function () {
                var steps = Wizard.getSteps();
                expect(steps[0].isActive).toBeFalsy();
                expect(steps[0].status).toBe('complete');
            });

            it('should direct the user to the /summaryMSA-IRS page', function () {
                expect(location.path()).toBe('/summaryMSA-IRS');
            });
        });
    });

    describe('previous()', function () {
        beforeEach(function() {
            scope.previous();
            scope.$digest();
        });

        it('should direct the user to the /summarySyntacticalValidity page', function () {
            expect(location.path()).toBe('/summarySyntacticalValidity');
        });
    });
});
