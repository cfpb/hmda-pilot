'use strict';

/**
 * @ngdoc function
 * @name hmdaPilotApp.controller:SummaryQualityMacroCtrl
 * @description
 * # SummaryQualityMacroCtrl
 * Controller for the Syntactical and Validity Summary view
 */
module.exports = /*@ngInject*/ function ($scope, $location, $q, $timeout, HMDAEngine, Wizard, Session) { /*jshint ignore:line*/

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

    // Populate the $scope
    $scope.errors = {};
    $scope.isProcessing = false;

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
        // Toggle processing flag on so that we can notify the user
        $scope.isProcessing = true;

        $timeout(function() { $scope.process(); }, 100); // Pause before starting the validation so that the DOM can update
    };

    $scope.process = function() {
        // Run the second set of validations
        var ruleYear = HMDAEngine.getRuleYear();
        $q.all([HMDAEngine.runSpecial(ruleYear)]).then(function() {

            // Complete the current step in the wizard
            $scope.wizardSteps = Wizard.completeStep();

            // And go the next summary page
            $location.path('/summaryMSA-IRS');

            // Toggle processing flag off
            $scope.isProcessing = false;
        }).catch(function(err) {
            // Toggle processing flag off
            $scope.isProcessing = false;

            $scope.errors.global = err.message;
            return;
        });
    };
};
