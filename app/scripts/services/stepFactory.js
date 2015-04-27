'use strict';

/**
 * Factory for creating steps that can be used by the Wizard navigation service.
 *
 * @namespace hmdaPilotApp
 * @module {Factory} StepFactory
 */
module.exports = /*@ngInject*/ function(StepStatus) {

    // Constructor
    function Step(title, view) {
        this.title = title;
        this.view = view;
        this.status = StepStatus.incomplete;
        this.isActive = false;
        this.isFocused = false;
    }

    Step.prototype = {
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

        isSelectable: function() {
            return this.status === StepStatus.complete || this.isActive;
        }
    };

    return (Step);
};
