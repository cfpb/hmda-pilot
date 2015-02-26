'use strict';

/**
 * @ngdoc function
 * @name hmdaPilotApp.controller:SummaryMSAIRSCtrl
 * @description
 * # SummaryMSAIRSCtrl
 * Controller of the hmdaPilotApp
 */
module.exports = /*@ngInject*/ function ($scope, $location, Wizard, HMDAEngine, Session) {

    Array.prototype.diff = function(a) {
        return this.filter(function(i) { return a.indexOf(i) < 0; });
    };

    function hasUnverifiedSpecialErrors() {
        var editIds = Object.keys($scope.specialErrors),
            verifiedIds = Session.getVerifiedSpecialEditIds(),
            diff = editIds.diff(verifiedIds);
        return diff.length > 0;
    }

    // Get the list of errors from the HMDAEngine
    var editErrors = HMDAEngine.getErrors();

    $scope.specialErrors = editErrors.special || {};

    $scope.showIRSReport = function() {
        return !hasUnverifiedSpecialErrors();
    };

    $scope.previous = function () {
        $location.path('/summaryQualityMacro');
    };

    $scope.hasNext = function() {
        return !hasUnverifiedSpecialErrors() && Session.hasVerifiedIRSReport();
    };

    $scope.next = function() {
        // Complete the current step
        $scope.wizardSteps = Wizard.completeStep();

        // Go to the next page
        $location.path('/validationSummary');
    };
};
