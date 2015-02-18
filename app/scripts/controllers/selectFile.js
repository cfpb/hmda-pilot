'use strict';

/**
 * @ngdoc function
 * @name hmdaPilotApp.controller:selectFile
 * @description
 * # Select File
 * Controller for selecting a HMDA file and Reporting Year for verification.
 */
module.exports = /*@ngInject*/ function ($scope, $location, $q, $timeout, FileReader, FileMetadata, HMDAEngine, Wizard, Session) {
    var fiscalYears = HMDAEngine.getValidYears();

    // Set/Reset the state of different objects on load
    Session.reset();
    HMDAEngine.clearHmdaJson();
    HMDAEngine.clearErrors();
    $scope.metadata = FileMetadata.clear();
    $scope.wizardSteps = Wizard.initSteps();

    // Populate the $scope
    $scope.reportingYears = fiscalYears;
    $scope.isProcessing = false;

    // Initialize the errors for the form fields
    $scope.errors = {};

    // Set default values for any form fields
    $scope.hmdaData = {
        year: fiscalYears[fiscalYears.length-2], // 2 because of 0 indexes
        file: ''
    };

    $scope.getFile = function() {
        // Read the contents of the file and set a value in the scope when its complete
        FileReader.readAsText($scope.file, 'utf-8', $scope).then(function(result) {
            $scope.hmdaData.file = result;
        });

        // Set the filename so that we can use it when displaying the metadata
        FileMetadata.setFilename($scope.file.name);
    };

    // Process the form submission
    $scope.submit = function(hmdaData) {
        // Clear out any existing errors
        $scope.errors.global = null;
        // Toggle processing flag on so that we can notify the user
        $scope.isProcessing = true;

        $timeout(function() { $scope.process(hmdaData); }, 100); // Pause before starting the conversion so that the DOM can update

    };

    $scope.process = function(hmdaData) {
        // Convert the file to JSON
        HMDAEngine.fileToJson(hmdaData.file, hmdaData.year, function(fileErr) {
            if (fileErr) {
                // Toggle processing flag off
                $scope.isProcessing = false;

                $scope.errors.global = fileErr;
                $scope.$apply();
                return;
            }

            $q.all([HMDAEngine.runSyntactical(hmdaData.year), HMDAEngine.runValidity(hmdaData.year)])
            .then(function() {
                // Refresh the file metadata
                FileMetadata.refresh();

                // Complete the current step in the wizard
                $scope.wizardSteps = Wizard.completeStep();

                // And go the summary page
                $location.path('/summarySyntacticalValidity');

                // Toggle processing flag off
                $scope.isProcessing = false;
            })
            .catch(function(err) {
                // Toggle processing flag off
                $scope.isProcessing = false;

                $scope.errors.global = err.message;
                return;
            });

        });
    };
};
