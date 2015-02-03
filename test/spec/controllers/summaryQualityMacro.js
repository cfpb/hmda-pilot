'use strict';

require('angular');
require('angular-mocks');

describe('Controller: SummaryQualityMacroCtrl', function () {

    var scope,
        location,
        controller,
        Wizard,
        mockEngine,
        mockErrors = {
            quality: {},
            macro: {}
        };

    beforeEach(angular.mock.module('hmdaPilotApp'));

    beforeEach(inject(function ($rootScope, $location, $controller, _Wizard_) {
        scope = $rootScope.$new();
        location = $location;
        controller = $controller;
        Wizard = _Wizard_;
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
            Wizard: _Wizard_
        });
    }));

    it('should include the quality errors in the scope', function () {
        expect(scope.qualityErrors).toEqual({});
    });

    it('should include the macro errors in the scope', function () {
        expect(scope.macroErrors).toEqual({});
    });

    describe('hasNext()', function() {
        // TODO: Stubbing out for now
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
