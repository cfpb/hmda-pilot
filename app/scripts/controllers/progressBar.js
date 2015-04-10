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

    HMDAEngine.getProgress().events.on('progressStep', function(percent) {
        $scope.$apply(function(){
            $scope.percentageComplete = percent;
        });
    });
};
