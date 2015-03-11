'use strict';

/**
 * @ngdoc function
 * @name hmdaPilotApp.controller:SummarySyntacticalValidityCtrl
 * @description
 * # SummarySyntacticalValidityCtrl
 * Controller for the Syntactical and Validity Summary view
 */
module.exports = /*@ngInject*/ function ($scope, $location, $q, $timeout, HMDAEngine, Wizard) {

    // Populate the $scope
    $scope.errors = {};
    $scope.isProcessing = false;

    // Get the list of errors from the HMDAEngine
    var editErrors = HMDAEngine.getErrors();

    $scope.syntacticalErrors = editErrors.syntactical || {};
    $scope.validityErrors = editErrors.validity || {};

    $scope.previous = function() {
        $location.path('/');
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
            // Toggle processing flag on so that we can notify the user
            $scope.isProcessing = true;

            // Pause before starting the validation so that the DOM can update
            $timeout(function() { $scope.process(); }, 100);
        }
    };

    $scope.process = function() {
        // Run the second set of validations
        var ruleYear = HMDAEngine.getRuleYear();
        if (HMDAEngine.getDebug()) {
            console.time('total time for quality and macro edits');
        }
        $q.all([HMDAEngine.runQuality(ruleYear), HMDAEngine.runMacro(ruleYear)])
        .then(function() {
            if (HMDAEngine.getDebug()) {
                console.timeEnd('total time for quality and macro edits');
            }
            // Complete the current step in the wizard
            $scope.wizardSteps = Wizard.completeStep();

            // And go the next summary page
            $location.path('/summaryQualityMacro');

            // Toggle processing flag off
            $scope.isProcessing = false;
        })
        .catch(function(err) {
            // Toggle processing flag off
            $scope.isProcessing = false;

            $scope.errors.global = err.message;
            return;
        });
    };
};
