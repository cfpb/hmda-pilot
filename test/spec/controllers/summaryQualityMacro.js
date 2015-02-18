'use strict';

require('angular');
require('angular-mocks');

describe('Controller: SummaryQualityMacroCtrl', function () {

    var scope,
        location,
        controller,
        Wizard,
        Session,
        mockEngine,
        mockErrors = {
            quality: {},
            macro: {}
        };

    beforeEach(angular.mock.module('hmdaPilotApp'));

    beforeEach(inject(function ($rootScope, $location, $controller, _Wizard_, _Session_) {
        scope = $rootScope.$new();
        location = $location;
        controller = $controller;
        Wizard = _Wizard_;
        Session = _Session_;
        mockEngine = {
            getErrors: function() {
                return mockErrors;
            }
        };
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

    describe('next()', function() {
        beforeEach(function() {
            scope.next();
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
