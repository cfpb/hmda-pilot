'use strict';

/**
 * Provides the scope and functions for the Validation Summary view.
 *
 * @namespace hmdaPilotApp
 * @module {Controller} ValidationSummary
 */
module.exports = /*@ngInject*/ function($scope, $location, FileMetadata, HMDAEngine, ngDialog, Configuration) {

    $scope.fileMetadata = FileMetadata.get();
    $scope.transmittalSheet = HMDAEngine.getHmdaJson().hmdaFile.transmittalSheet;
    HMDAEngine.destroyDB();

    $scope.previous = function() {
        $location.path('/summaryMSA-IRS');
    };

    $scope.startOver = function() {
        if (Configuration.confirmSessionReset) {
            ngDialog.openConfirm({
                template: 'partials/confirmSessionReset.html'
            }).then(function(value) {
                if (value === 'reset') {
                    $location.path('/selectFile');
                }
            });
        } else {
            $location.path('/selectFile');
        }
    };
};
