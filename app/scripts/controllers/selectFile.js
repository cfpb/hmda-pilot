'use strict';

/**
 * @ngdoc function
 * @name hmdaPilotApp.controller:selectFile
 * @description
 * # Select File
 * Controller for selecting a HMDA file and Reporting Year for verification.
 */
module.exports = function ($scope, RuleEngine) {
    var fiscalYears = RuleEngine.getFiscalYears();

    // Populate the $scope
    $scope.reportingYears = fiscalYears;

    // Set default values for any form fields
    $scope.hmdaData = {
        year: fiscalYears[1],
        file: ''
    };

    // Process the form submission
    $scope.submit = function(hmdaData) {
        // Nothing to hook up to yet...
    };
};
