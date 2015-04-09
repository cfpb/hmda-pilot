'use strict';

/**
 * @ngdoc function
 * @name hmdaPilotApp.controller:SummarySyntacticalValidityCtrl
 * @description
 * # SummarySyntacticalValidityCtrl
 * Controller for the Syntactical and Validity Summary view
 */
module.exports = /*@ngInject*/ function ($scope, $location, $q, $timeout, HMDAEngine, Wizard, ngDialog, Configuration) {

    // Populate the $scope
    $scope.errors = {};

    // Get the list of errors from the HMDAEngine
    var progressDialog,
        editErrors = HMDAEngine.getErrors();

    $scope.syntacticalErrors = editErrors.syntactical || {};
    $scope.validityErrors = editErrors.validity || {};

    $scope.previous = function() {
        if (Configuration.confirmSessionReset) {
            ngDialog.openConfirm({
                template: 'partials/confirmSessionReset.html'
            }).then(function (value) {
                if (value === 'reset') {
                    $location.path('/');
                }
    		});
        } else {
            $location.path('/');
        }
    };

    $scope.hasNext = function() {
        return angular.equals({}, $scope.syntacticalErrors) && angular.equals({}, $scope.validityErrors);
    };

    function hasErrors(obj) {
        return Object.keys(obj).length > 0;
    }

    $scope.next = function() {
        if (hasErrors(editErrors.quality) || hasErrors(editErrors.macro)) {
            $location.path('/summaryQualityMacro');
        } else{
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

        $q.all([HMDAEngine.runQuality(ruleYear), HMDAEngine.runMacro(ruleYear)])
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
