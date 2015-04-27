'use strict';

var StepStatus = require('../../../app/scripts/services/stepStatus');
var StepFactory = require('../../../app/scripts/services/stepFactory')(StepStatus);

describe('Factory: StepFactory', function() {

    var step;

    // Initialize the factory
    beforeEach(function() {
        step = new StepFactory('title2', 'view');
    });

    it('should default the status to incomplete', function() {
        expect(step.status).toBe('incomplete');
    });

    it('should default isActive to false', function() {
        expect(step.isActive).toBeFalsy();
    });

    describe('isComplete', function() {
        it('should be false by default', function() {
            expect(step.isComplete()).toBeFalsy();
        });
    });

    describe('isIncomplete', function() {
        it('should be true by default', function() {
            expect(step.isIncomplete()).toBeTruthy();
        });
    });

    describe('markComplete', function() {
        it('should set the step status to complete', function() {
            step.markComplete();
            expect(step.isComplete()).toBeTruthy();
        });
    });

    describe('markIncomplete', function() {
        it('should set the step status to incomplete', function() {
            step.markIncomplete();
            expect(step.isIncomplete()).toBeTruthy();
        });
    });

    describe('isSelectable', function() {
        it('should return true if the step status is complete', function() {
            step.markComplete();
            expect(step.isSelectable()).toBeTruthy();
        });

        it('should return true if the step status is active', function() {
            step.isActive = true;
            expect(step.isSelectable()).toBeTruthy();
        });

        it('should return false if the step status is incomplete', function() {
            step.markIncomplete();
            expect(step.isSelectable()).toBeFalsy();
        });
    });
});
