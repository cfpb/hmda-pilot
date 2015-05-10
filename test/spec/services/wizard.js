'use strict';

require('angular');
require('angular-mocks');

describe('Service: Wizard', function() {

    var service,
        steps,
        StepStatus;

    beforeEach(angular.mock.module('hmdaPilotApp'));

    beforeEach(inject(function(_Wizard_, _StepStatus_) {
        service = _Wizard_;
        StepStatus = _StepStatus_;

        steps = service.initSteps();
    }));

    describe('initSteps()', function() {

        it('should set the first step to active', function() {
            expect(steps[0].isActive).toBeTruthy();
        });
    });

    describe('getSteps()', function() {

        beforeEach(function() {
            steps = service.getSteps();
        });

        it('should return the steps', function() {
            expect(steps[0].status).toBe(StepStatus.incomplete);
            expect(steps[0].isActive).toBeTruthy();
            expect(steps[1].status).toBe(StepStatus.incomplete);
            expect(steps[2].status).toBe(StepStatus.incomplete);
        });
    });

    describe('getCurrentStepIdx()', function() {

        it('should return the index of the current step', function() {
            expect(service.getCurrentStepIdx()).toBe(0);
        });
    });

    describe('getCurrentStep()', function() {

        it('should return the current step', function() {
            var step = service.getCurrentStep();
            expect(step.title).toBe('Select file & validate');
            expect(step.view).toBe('selectFile');
            expect(step.status).toBe(StepStatus.incomplete);
            expect(step.isActive).toBeTruthy();
        });
    });
});
