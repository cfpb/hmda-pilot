'use strict';

/**
 * @ngdoc function
 * @name hmdaPilotApp.controller:ValidationSummaryCtrl
 * @description
 * # ValidationSummaryCtrl
 * Controller of the hmdaPilotApp
 */
module.exports = /*@ngInject*/ function ($scope, $location, FileMetadata, HMDAEngine, ngDialog) {

    $scope.fileMetadata = FileMetadata.get();
    $scope.transmittalSheet = HMDAEngine.getHmdaJson().hmdaFile.transmittalSheet;

    $scope.previous = function () {
        $location.path('/summaryMSA-IRS');
    };

    $scope.startOver = function() {
        ngDialog.openConfirm({
            template: 'partials/confirmSessionReset.html'
        }).then(function (value) {
            if (value === 'reset') {
                $location.path('/selectFile');
            }
		});
    };
};
