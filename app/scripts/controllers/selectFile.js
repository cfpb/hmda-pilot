'use strict';

/**
 * @ngdoc function
 * @name hmdaPilotApp.controller:selectFile
 * @description
 * # Select File
 * Controller for selecting a HMDA file and Reporting Year for verification.
 */
module.exports = function ($scope, $location, FileReader, RuleEngine, HMDAEngine) {
    var fiscalYears = RuleEngine.getFiscalYears();

    // Populate the $scope
    $scope.reportingYears = fiscalYears;

    // Initialize the errors for the form fields
    $scope.errors = {};

    // Set default values for any form fields
    $scope.hmdaData = {
        year: fiscalYears[1],
        file: ''
    };

    $scope.getFile = function() {
        FileReader.readFile($scope.file, $scope).then(function(result) {
            $scope.hmdaData.file = result;
        });
    };

    // Process the form submission
    $scope.submit = function(hmdaData) {
        // Convert the file to JSON
        HMDAEngine.fileToJson(hmdaData.file, hmdaData.year, function(err) {
            if (err) {
                $scope.errors.global = err;
                return;
            }

            // Run the first set of validations
            HMDAEngine.runSyntactical(hmdaData.year);
            HMDAEngine.runValidity(hmdaData.year);

            // And go the summary page
            $location.path('/summarySyntacticalValidity');
        });
    };
};
