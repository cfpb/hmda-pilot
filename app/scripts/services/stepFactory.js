'use strict';

/**
 * @ngdoc factory
 * @name hmdaPilotApp.factory:step
 * @description
 * # Step Factory
 * Factory for creating steps that can be used by the Wizard navigation service.
 */
module.exports = function (StepStatus) {

    // Constructor
    function Step(title, view) {
        this.title = title;
        this.view = view;
        this.status = StepStatus.incomplete;
    }

    Step.prototype = {
        isActive: function() {
            return this.status === StepStatus.active;
        },

        isComplete: function() {
            return this.status === StepStatus.complete;
        },

        isIncomplete: function() {
            return this.status === StepStatus.incomplete;
        },

        markComplete: function() {
            this.status = StepStatus.complete;
        },

        markIncomplete: function() {
            this.status = StepStatus.incomplete;
        },

        markActive: function() {
            this.status = StepStatus.active;
        }
    };

    return (Step);
};

