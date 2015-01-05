'use strict';

/**
 * @ngdoc service
 * @name hmdaPilotApp.service:wizard
 * @description
 * # Wizard navigation service
 * Service for maintaining the state of the wizard navigation.
 */
module.exports = function ($route) {

    var STATUS = {
        active: 'active',
        complete: 'complete',
        incomplete: 'incomplete',
        hasError: 'error'
    };

    var steps = [{
            title: 'Select file & upload',
            view: 'selectFile',
            status: STATUS.active,
        },{
            title: 'Syntactical & validity edit reports',
            view: 'summarySyntacticalValidity',
            status: STATUS.complete
        },{
            title: 'Quality & macro edit reports',
            view: 'summaryQualityMacro',
            status: STATUS.hasError
        },{
            title: 'MSA and IRS reports',
            view: 'summaryMSA-IRS',
            status: STATUS.incomplete
        },{
            title: 'Submit',
            view: 'submit',
            status: STATUS.incomplete
        }];

    /**
     * Get a list of the steps that make up the wizard
     *
     * @return {Array} steps
     */
    this.getSteps = function() {
        var currentTemplateUrl = $route.current.templateUrl;

        if (!$route.current.redirectTo) {
            for (var i=0; i < steps.length; i++) {
                if (currentTemplateUrl.indexOf(steps[i].view) !== -1) {
                    steps[i].status = STATUS.active;
                } else {
                    steps[i].status = STATUS.complete;
                }
            }
        }
        return steps;
    };
};

