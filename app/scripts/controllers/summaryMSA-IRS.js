'use strict';

/**
 * Provides the scope and functions for the MSA/MD and IRS Summary view.
 *
 * @namespace hmdaPilotApp
 * @module {Controller} SummaryMSAIRS
 */
module.exports = /*@ngInject*/ function($scope, $location, Wizard, HMDAEngine, Session) {

    Array.prototype.diff = function(a) {
        return this.filter(function(i) { return a.indexOf(i) < 0; });
    };

    function hasUnverifiedSpecialErrors() {
        var editIds = [],
            verifiedIds = Session.getVerifiedSpecialEditIds();
        if ($scope.data.specialErrors) {
            editIds = Object.keys($scope.data.specialErrors);
        }
        var diff = editIds.diff(verifiedIds);
        return diff.length > 0;
    }

    // Get the list of errors from the HMDAEngine
    $scope.data = {
        specialErrors: HMDAEngine.getErrors().special
    };

    $scope.showIRSReport = function() {
        return !hasUnverifiedSpecialErrors();
    };

    $scope.isIRSVerified = function() {
        return Session.hasVerifiedIRSReport();
    };

    $scope.previous = function() {
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
