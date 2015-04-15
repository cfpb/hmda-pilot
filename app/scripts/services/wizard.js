'use strict';

/**
 * @ngdoc service
 * @name hmdaPilotApp.service:wizard
 * @description
 * # Wizard navigation service
 * Service for maintaining the state of the wizard navigation.
 */
module.exports = /*@ngInject*/ function (StepFactory) {

    var steps,
        currentStepIdx;

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
     * @return {Object} step
     */
    this.getCurrentStep = function() {
        return steps[currentStepIdx];
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
