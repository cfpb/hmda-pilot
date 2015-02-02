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
        HMDAEngine.fileToJson(hmdaData.file, hmdaData.year, function(fileErr) {
            if (fileErr) {
                $scope.errors.global = fileErr;
                $scope.$apply();
                return;
            }

            // Run the first set of validations
            HMDAEngine.runSyntactical(hmdaData.year, function(synErr) {
                if (synErr) {
                    $scope.errors.global = synErr;
                    $scope.$apply();
                    return;
                }

                HMDAEngine.runValidity(hmdaData.year, function(valErr) {
                    if (valErr) {
                        $scope.errors.global = valErr;
                        $scope.$apply();
                        return;
                    }

                    // Refresh the file metadata
                    FileMetadata.refresh();

                    // Complete the current step in the wizard
                    $scope.wizardSteps = Wizard.completeStep();

                    // And go the summary page
                    $location.path('/summarySyntacticalValidity');
                    $scope.$apply(); // Force the angular to update the $scope since we're technically in a callback func
                });
            });

            // Toggle processing flag off
            $scope.isProcessing = false;
        });
    };
};
