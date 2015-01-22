'use strict';

/**
 * @ngdoc function
 * @name hmdaPilotApp.controller:SummaryQualityMacroCtrl
 * @description
 * # SummaryQualityMacroCtrl
 * Controller of the hmdaPilotApp
 */
module.exports = /*@ngInject*/ function ($scope, $location, Wizard) {

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
