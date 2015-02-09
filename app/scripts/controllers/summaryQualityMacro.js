'use strict';

/**
 * @ngdoc function
 * @name hmdaPilotApp.controller:SummaryQualityMacroCtrl
 * @description
 * # SummaryQualityMacroCtrl
 * Controller for the Syntactical and Validity Summary view
 */
module.exports = /*@ngInject*/ function ($scope, $location, HMDAEngine, Wizard, Session) {

    Array.prototype.diff = function(a) {
        return this.filter(function(i) { return a.indexOf(i) < 0; });
    };

    function hasUnverifiedQualityErrors() {
        var editIds = Object.keys($scope.qualityErrors),
            verifiedIds = Session.getVerifiedQualityEditIds(),
            diff = editIds.diff(verifiedIds);
        return diff.length > 0;
    }

    function hasUnverifiedMacroErrors() {
        var editIds = Object.keys($scope.macroErrors),
            verifiedIds = Session.getVerifiedMacroEditIds(),
            diff = editIds.diff(verifiedIds);
        return diff.length > 0;
    }

    // Get the list of errors from the HMDAEngine
    var editErrors = HMDAEngine.getErrors();

    $scope.qualityErrors = editErrors.quality || {};
    $scope.macroErrors = editErrors.macro || {};

    $scope.previous = function () {
        $location.path('/summarySyntacticalValidity');
    };

    $scope.hasNext = function() {
        return !hasUnverifiedQualityErrors() && !hasUnverifiedMacroErrors();
    };

    $scope.next = function() {
        // Complete the current step
        $scope.wizardSteps = Wizard.completeStep();

        // Go to the next page
        $location.path('/summaryMSA-IRS');
    };
};
