'use strict';

/**
 * @ngdoc function
 * @name hmdaPilotApp.controller:SubmitCtrl
 * @description
 * # SubmitCtrl
 * Controller of the hmdaPilotApp
 */
module.exports = /*@ngInject*/ function ($scope, $location, Wizard) {

    $scope.previous = function () {
        $location.path('/summaryMSA-IRS');
    };

    $scope.canSubmit = function() {
        // TODO: Determine what is required to pass in order for the user to submit the form
        return true;
    };

    // Process the form submission
    $scope.submit = function(submissionData) {
        // TODO: Do something with the submissionData
        console.log('Submission Data: ', submissionData);

        // Complete the current step
        $scope.wizardSteps = Wizard.completeStep();

        // Go to the next page
        $location.path('/selectFile');
    };
};
