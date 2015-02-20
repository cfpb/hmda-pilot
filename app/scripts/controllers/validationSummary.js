'use strict';

/**
 * @ngdoc function
 * @name hmdaPilotApp.controller:ValidationSummaryCtrl
 * @description
 * # ValidationSummaryCtrl
 * Controller of the hmdaPilotApp
 */
module.exports = /*@ngInject*/ function ($scope, $location, FileMetadata, HMDAEngine) {

    $scope.fileMetadata = FileMetadata.get();
    $scope.transmittalSheet = HMDAEngine.getHmdaJson().hmdaFile.transmittalSheet;

    $scope.previous = function () {
        $location.path('/summaryMSA-IRS');
    };

    $scope.startOver = function() {
        // Go to the next page
        $location.path('/selectFile');
    };
};
