'use strict';

/**
 * Provides the scope and functions for the Quality and Macro Summary view.
 *
 * @namespace hmdaPilotApp
 * @module {Controller} SummaryQualityMacro
 */
module.exports = /*@ngInject*/ function($scope, $location, $q, $timeout, HMDAEngine, Wizard, Session, ngDialog, Configuration) { /*jshint ignore:line*/

    // Set/Reset the state of different objects on load
    HMDAEngine.clearProgress();

    Array.prototype.diff = function(a) {
        return this.filter(function(i) { return a.indexOf(i) < 0; });
    };

    function hasUnverifiedQualityErrors() {
        var editIds = [],
            verifiedIds = Session.getVerifiedQualityEditIds();
        if ($scope.data.qualityErrors) {
            editIds = Object.keys($scope.data.qualityErrors);
        }
        var diff = editIds.diff(verifiedIds);
        return diff.length > 0;
    }

    function hasUnverifiedMacroErrors() {
        var editIds = [],
            verifiedIds = Session.getVerifiedMacroEditIds();
        if ($scope.data.macroErrors) {
            editIds = Object.keys($scope.data.macroErrors);
        }
        var diff = editIds.diff(verifiedIds);
        return diff.length > 0;
    }

    function hasErrors(obj) {
        return Object.keys(obj).length > 0;
    }

    // Populate the $scope
    $scope.errors = {};

    // Get the list of errors from the HMDAEngine
    var progressDialog;

    $scope.data = {
        qualityErrors: HMDAEngine.getErrors().quality,
        macroErrors: HMDAEngine.getErrors().macro
    };

    $scope.previous = function() {
        $location.path('/summarySyntacticalValidity');
    };

    $scope.hasNext = function() {
        return !hasUnverifiedQualityErrors() && !hasUnverifiedMacroErrors();
    };

    $scope.next = function() {
        if (hasErrors(HMDAEngine.getErrors().special)) {
            $location.path('/summaryMSA-IRS');
        } else {
            // Give a name to the current step in the process (shown in the progressDialog)
            $scope.processStep = 'Processing MSA/MD Data...';

            progressDialog = ngDialog.open(angular.extend(Configuration.progressDialog, {scope: $scope}));

            // Pause before starting the validation so that the DOM can update
            $timeout(function() { $scope.process(); }, 100);
        }
    };

    $scope.process = function() {
        // Run the second set of validations
        var ruleYear = HMDAEngine.getRuleYear();

        /* istanbul ignore if debug */
        if (HMDAEngine.getDebug()) {
            console.time('total time for special edits');
        }

        Promise.all([HMDAEngine.runSpecial(ruleYear)])
        .then(function() {

            /* istanbul ignore if debug */
            if (HMDAEngine.getDebug()) {
                console.timeEnd('total time for special edits');
            }

            // Complete the current step in the wizard
            $scope.wizardSteps = Wizard.completeStep();

            // And go the next summary page
            $location.path('/summaryMSA-IRS');

            // Close the progress dialog
            progressDialog.close();
        }).catch(function(err) {
            // Close the progress dialog
            progressDialog.close();

            $scope.errors.global = err.message;
            return;
        });
    };
};
