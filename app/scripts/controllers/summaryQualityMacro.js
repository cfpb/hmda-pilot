'use strict';

/**
 * @ngdoc function
 * @name hmdaPilotApp.controller:SummaryQualityMacroCtrl
 * @description
 * # SummaryQualityMacroCtrl
 * Controller for the Syntactical and Validity Summary view
 */
module.exports = /*@ngInject*/ function ($scope, $location, HMDAEngine, Wizard) {

    // Get the list of errors from the HMDAEngine
    var editErrors = HMDAEngine.getErrors();

    $scope.qualityErrors = editErrors.quality || {};
    $scope.macroErrors = editErrors.macro || {};

    $scope.previous = function () {
        $location.path('/summarySyntacticalValidity');
    };

    $scope.hasNext = function() {
        // TODO: Determine what is required to pass in order for the user to go to the next page
        return true;
    };

    $scope.next = function() {
        // Complete the current step
        $scope.wizardSteps = Wizard.completeStep();

        // Go to the next page
        $location.path('/summaryMSA-IRS');
    };
};
