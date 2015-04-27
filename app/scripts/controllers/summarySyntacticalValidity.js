'use strict';

/**
 * Provides the scope and functions for the Syntactical and Validity Summary view.
 *
 * @namespace hmdaPilotApp
 * @module {Controller} SummarySyntacticalValidity
 */
module.exports = /*@ngInject*/ function($scope, $location, $q, $timeout, HMDAEngine, Wizard, ngDialog, Configuration) {

    // Set/Reset the state of different objects on load
    HMDAEngine.clearProgress();

    // Get the list of errors from the HMDAEngine
    var progressDialog;

    // Populate the $scope
    $scope.errors = {};
    $scope.syntacticalErrors = HMDAEngine.getErrors().syntactical;
    $scope.validityErrors = HMDAEngine.getErrors().validity;

    $scope.previous = function() {
        if (Configuration.confirmSessionReset) {
            ngDialog.openConfirm({
                template: 'partials/confirmSessionReset.html'
            }).then(function(value) {
                if (value === 'reset') {
                    $location.path('/');
                }
            });
        } else {
            $location.path('/');
        }
    };

    $scope.hasNext = function() {
        return angular.equals({}, HMDAEngine.getErrors().syntactical) && angular.equals({}, HMDAEngine.getErrors().validity);
    };

    function hasErrors(obj) {
        return Object.keys(obj).length > 0;
    }

    $scope.next = function() {
        if (hasErrors(HMDAEngine.getErrors().quality) || hasErrors(HMDAEngine.getErrors().macro)) {
            $location.path('/summaryQualityMacro');
        } else {
            // Give a name to the current step in the process (shown in the progressDialog)
            $scope.processStep = 'Processing Quality and Macro edits...';

            progressDialog = ngDialog.open(angular.extend(Configuration.progressDialog, {scope: $scope}));

            // Pause before starting the validation so that the DOM can update
            $timeout(function() { $scope.process(); }, 100);
        }
    };

    $scope.process = function() {
        // Run the second set of validations
        var ruleYear = HMDAEngine.getRuleYear();

        /* istanbul ignore if debug */
        if (HMDAEngine.getDebug()) {
            console.time('total time for quality and macro edits');
        }

        Promise.all([HMDAEngine.runQuality(ruleYear), HMDAEngine.runMacro(ruleYear)])
        .then(function() {

            /* istanbul ignore if debug */
            if (HMDAEngine.getDebug()) {
                console.timeEnd('total time for quality and macro edits');
            }

            // Complete the current step in the wizard
            $scope.wizardSteps = Wizard.completeStep();

            // And go the next summary page
            $location.path('/summaryQualityMacro');

            // Close the progress dialog
            progressDialog.close();
        })
        .catch(function(err) {
            // Close the progress dialog
            progressDialog.close();

            $scope.errors.global = err.message;
            return;
        });
    };
};
