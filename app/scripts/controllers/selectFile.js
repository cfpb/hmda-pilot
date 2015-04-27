'use strict';
var ReadableBlobStream = require('readable-blob-stream');

/**
 * Provides the scope and functions for the HMDA file and reporting Year view.
 *
 * @namespace hmdaPilotApp
 * @module {Controller} SelectFile
 */
module.exports = /*@ngInject*/ function($scope, $location, $q, $timeout, FileMetadata, HMDAEngine, Wizard, Session, ngDialog, Configuration) {
    var progressDialog,
        loginDialog,
        fiscalYears = HMDAEngine.getValidYears();

    if (!Session.isValidSession()) {
        loginDialog = ngDialog.open(Configuration.loginDialogOptions);
    }

    // Set/Reset the state of different objects on load
    Session.reset();
    HMDAEngine.clearHmdaJson();
    HMDAEngine.clearErrors();
    HMDAEngine.clearProgress();
    HMDAEngine.destroyDB();
    $scope.metadata = FileMetadata.clear();
    $scope.wizardSteps = Wizard.initSteps();

    // Populate the $scope
    $scope.reportingYears = fiscalYears;

    // Initialize the errors for the form fields
    $scope.errors = {};

    // Set default values for any form fields
    $scope.hmdaData = {
        // 2 because of 0 indexes
        year: fiscalYears[fiscalYears.length - 2],
        file: '',
        local: false
    };

    $scope.getFile = function() {
        // Assign selected file as a readable stream
        $scope.hmdaData.file = new ReadableBlobStream($scope.file);

        // Set the filename so that we can use it when displaying the metadata
        FileMetadata.setFilename($scope.file.name);
    };

    // Process the form submission
    $scope.submit = function(hmdaData) {
        // Clear out any existing errors
        $scope.errors.global = null;

        // Give a name to the current step in the process (shown in the progressDialog)
        $scope.processStep = 'Processing HMDA file...';

        progressDialog = ngDialog.open(angular.extend(Configuration.progressDialog, {scope: $scope}));

        // Pause before starting the conversion so that the DOM can update
        $timeout(function() { $scope.process(hmdaData); }, 100);
    };

    $scope.process = function(hmdaData) {

        // Enable LocalDB support?
        HMDAEngine.setUseLocalDB(hmdaData.local);

        /* istanbul ignore if debug */
        if (HMDAEngine.getDebug()) {
            console.time('time to process hmda json');
        }

        // Convert the file to JSON
        HMDAEngine.fileToJson(hmdaData.file, hmdaData.year, function(fileErr) {
            if (fileErr) {
                // Close the progress dialog
                progressDialog.close();
                $scope.errors.global = fileErr;
                $scope.$apply();
                return;
            }

            /* istanbul ignore if debug */
            if (HMDAEngine.getDebug()) {
                console.timeEnd('time to process hmda json');
                console.time('total time for syntactical and validity edits');
            }

            // Reset progress back to 0
            $scope.percentageComplete = 0;

            // Give a name to the current step in the process (shown in the progressDialog)
            $scope.processStep = 'Validating Syntactical and Validity edits...';

            Promise.all([HMDAEngine.runSyntactical(hmdaData.year), HMDAEngine.runValidity(hmdaData.year)])
            .then(function() {

                /* istanbul ignore if debug */
                if (HMDAEngine.getDebug()) {
                    console.timeEnd('total time for syntactical and validity edits');
                }

                // Refresh the file metadata
                FileMetadata.refresh();

                // Complete the current step in the wizard
                $scope.wizardSteps = Wizard.completeStep();

                // And go the summary page
                $location.path('/summarySyntacticalValidity');

                // Close the progress dialog
                progressDialog.close();
            })
            .catch(function(err) {
                // Close the progress dialog
                progressDialog.close();

                $scope.errors.global = err.message;
                return;
            });
        });
    };
};
