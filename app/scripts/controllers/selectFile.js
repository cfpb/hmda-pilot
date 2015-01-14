'use strict';

/**
 * @ngdoc function
 * @name hmdaPilotApp.controller:selectFile
 * @description
 * # Select File
 * Controller for selecting a HMDA file and Reporting Year for verification.
 */
module.exports = function ($scope, RuleEngine, FileReader) {
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
        console.log('HMDA Data: ', hmdaData);
        // Nothing to hook up to yet...
    };
};
