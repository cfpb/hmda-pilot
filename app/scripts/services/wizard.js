'use strict';

/**
 * Service for maintaining the state of the wizard navigation.
 *
 * @namespace hmdaPilotApp
 * @module {Service} Wizard
 */
module.exports = /*@ngInject*/ function(StepFactory) {

    var steps = [],
        currentStepIdx = 0;

    /**
     * Initialize the steps used in the wizard
     *
     * @return {Array}        steps
     */
    this.initSteps = function() {
        steps = [
            new StepFactory('Select file & validate', 'selectFile'),
            new StepFactory('Syntactical & validity edit reports', 'summarySyntacticalValidity'),
            new StepFactory('Quality & macro edit reports', 'summaryQualityMacro'),
            new StepFactory('MSA and IRS reports', 'summaryMSA-IRS'),
            new StepFactory('Validation summary', 'validationSummary')
        ];

        // Make the first step active
        currentStepIdx = 0;
        steps[currentStepIdx].isActive = true;

        return steps;
    };

    /**
     * Get a list of the steps that make up the wizard
     *
     * @return {Array} steps
     */
    this.getSteps = function() {
        return steps;
    };

    /**
     * Get the current step
     *
     * @return {object} step
     */
    this.getCurrentStep = function() {
        return steps[currentStepIdx];
    };

    /**
     * Get the index of the current step
     *
     * @return {Number} current step index
     */
    this.getCurrentStepIdx = function() {
        return currentStepIdx;
    };

    /**
     * Sets the status of the current step to Complete and makes the next step active
     *
     * @return {Array} steps
     */
    this.completeStep = function() {
        // Mark the current step as complete
        steps[currentStepIdx].markComplete();
        steps[currentStepIdx].isActive = false;

        if (currentStepIdx < steps.length) {
            currentStepIdx += 1;
            steps[currentStepIdx].isActive = true;
        }

        return steps;
    };
};
