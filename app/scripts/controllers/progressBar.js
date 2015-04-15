'use strict';

/**
 * @ngdoc function
 * @name hmdaPilotApp.controller:ProgressBarCtrl
 * @description
 * # ProgressBarCtrl
 * Controller of the hmdaPilotApp
 */
module.exports = /*@ngInject*/ function ($scope, HMDAEngine) {

    $scope.percentageComplete = 0;

    function applyProgress(percent) {
        $scope.$apply(function($scope){
            $scope.percentageComplete = percent;
        });
    }

    HMDAEngine.getProgress().events.on('progressStep', applyProgress);
    HMDAEngine.getFileProgress().events.on('progressStep', applyProgress);

};
