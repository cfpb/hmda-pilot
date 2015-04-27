'use strict';

/**
 * Provides the scope and functions for the progress bar.
 *
 * @namespace hmdaPilotApp
 * @module {Controller} ProgressBar
 */
module.exports = /*@ngInject*/ function($scope, $window, HMDAEngine) {

    $scope.percentageComplete = 0;

    function applyProgress(percent) {
        $scope.$evalAsync(function($scope) {
            $scope.percentageComplete = percent;
        });
    }

    HMDAEngine.getProgress().events.on('progressStep', applyProgress);
    HMDAEngine.getFileProgress().events.on('progressStep', applyProgress);

    $scope.cancel = function() {
        $scope.closeThisDialog();
        $window.location.reload();
    };
};
