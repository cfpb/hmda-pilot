'use strict';

/**
 * @ngdoc function
 * @name hmdaPilotApp.controller:selectFile
 * @description
 * # Select File
 * Controller for selecting a HMDA file and Reporting Year for verification.
 */
module.exports = /*@ngInject*/ function ($scope, $location, $timeout, FileReader, FileMetadata, HMDAEngine, Wizard) {
    var fiscalYears = HMDAEngine.getValidYears();

    // Set/Reset the state of different objects on load
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
        FileReader.readFile($scope.file, $scope).then(function(result) {
            $scope.hmdaData.file = result;
        });

        // Set the filename so that we can use it when displaying the metadata
        FileMetadata.setFilename($scope.file.name);
    };

    // Process the form submission
    $scope.submit = function(hmdaData) {
        // Toggle processing flag on so that we can notify the user
        $scope.isProcessing = true;

        $timeout(function() { return; }, 250); // Pause before starting the conversion so that the DOM can update

        // Convert the file to JSON
        HMDAEngine.fileToJson(hmdaData.file, hmdaData.year, function(err) {
            if (err) {
                $scope.errors.global = err;
                $scope.$apply();
                return;
            }

            try {
                // Run the first set of validations
                HMDAEngine.runSyntactical(hmdaData.year);
                HMDAEngine.runValidity(hmdaData.year);

                // Refresh the file metadata
                FileMetadata.refresh();

                // Complete the current step in the wizard
                $scope.wizardSteps = Wizard.completeStep();

                // And go the summary page
                $location.path('/summarySyntacticalValidity');
                $scope.$apply(); // Force the angular to update the $scope since we're technically in a callback func
            } catch (err) {
                console.log(err);
                if (err.name === 'NetworkError') {
                    $scope.errors.global = 'There was a problem connecting to the HMDA server. Please check your connection or try again later.';
                } else {
                    $scope.errors.global = 'There was a problem validating the HMDA File. Please check your file and try again.';
                }
            }

            // Toggle processing flag off
            $scope.isProcessing = false;
        });
    };
};
