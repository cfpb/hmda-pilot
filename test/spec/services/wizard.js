'use strict';

require('angular');
require('angular-mocks');

describe('Service: Wizard', function () {

    var service,
        steps,
        StepStatus;

    beforeEach(angular.mock.module('hmdaPilotApp'));

    beforeEach(inject(function (_Wizard_, _StepStatus_) {
        service = _Wizard_;
        StepStatus = _StepStatus_;

        steps = service.initSteps();
    }));

    describe('initSteps', function() {

        it('should set the first step to active', function () {
            expect(steps[0].isActive).toBeTruthy();
        });
    });

    describe('getSteps', function() {

        beforeEach(function() {
            steps = service.getSteps();
        });

        it('should return the steps', function () {
            expect(steps[0].status).toBe(StepStatus.incomplete);
            expect(steps[0].isActive).toBeTruthy();
            expect(steps[1].status).toBe(StepStatus.incomplete);
            expect(steps[2].status).toBe(StepStatus.incomplete);
        });
    });
});
