'use strict';

/**
 * @ngdoc function
 * @name hmdaPilotApp.controller:selectFile
 * @description
 * # Select File
 * Controller for selecting a HMDA file and Reporting Year for verification.
 */
module.exports = /*@ngInject*/ function ($scope, $location, FileReader, RuleEngine, HMDAEngine) {
    var fiscalYears = HMDAEngine.getValidYears();

    // Populate the $scope
    $scope.reportingYears = fiscalYears;

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
        RuleEngine.setFilename($scope.file.name);
    };

    // Process the form submission
    $scope.submit = function(hmdaData) {
        // Convert the file to JSON
        HMDAEngine.fileToJson(hmdaData.file, hmdaData.year, function(err) {
            if (err) {
                $scope.errors.global = err;
                $scope.$apply();
                return;
            }

            // Run the first set of validations
            HMDAEngine.runSyntactical(hmdaData.year);
            HMDAEngine.runValidity(hmdaData.year);

            // And go the summary page
            $location.path('/summarySyntacticalValidity');
            $scope.$apply(); // Force the angular to update the $scope since we're technically in a callback func
        });
    };
};
