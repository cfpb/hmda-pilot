'use strict';

/**
 * @ngdoc service
 * @name hmdaPilotApp.service:wizard
 * @description
 * # Wizard navigation service
 * Service for maintaining the state of the wizard navigation.
 */
module.exports = function ($route, StepStatus) {

    var steps;

    // Determine if a step is currently active by checking the templateUrl of
    // the currently displayed view
    function isCurrentStepByLocation(step) {
        return $route.current.templateUrl.indexOf(step.view) !== -1;
    }

    /**
     * Initialize the steps used in the wizard
     *
     * @param  {Array} steps  array of steps
     * @return {Array}        steps
     */
    this.initSteps = function(newSteps) {
        steps = newSteps;

        // set the first step to active
        steps[0].status = StepStatus.active;

        return steps;
    };

    /**
     * Get a list of the steps that make up the wizard
     *
     * @return {Array} steps
     */
    this.getSteps = function() {
        if (!$route.current.redirectTo) {
            for (var i=0; i < steps.length; i++) {
                if (isCurrentStepByLocation(steps[i])) {
                    steps[i].markActive();
                }
            }
        }
        return steps;
    };
};

