'use strict';

/**
 * @ngdoc function
 * @name hmdaPilotApp.controller:IRSReportCtrl
 * @description
 * # IRSReportCtrl
 * Controller of the hmdaPilotApp
 */
module.exports = /*@ngInject*/ function ($scope, $location, $q, HMDAEngine, Session) {

    var LARs = HMDAEngine.getHmdaJson().hmdaFile.loanApplicationRegisters;

    /* istanbul ignore if debug */
    if (HMDAEngine.getDebug()) {
        console.time('total time for IRS report');
    }

    // Initialize scope
    HMDAEngine.getTotalsByMSA(LARs).then(function(response) {

        /* istanbul ignore if debug */
        if (HMDAEngine.getDebug()) {
            console.timeEnd('total time for IRS report');
        }

        $scope.error = {
            errors: response
        };
        $scope.$apply();
    });
    $scope.verified = Session.hasVerifiedIRSReport();
    $scope.canVerify = $scope.verified;

    $scope.backToSummary = function() {
        $location.path('/summaryMSA-IRS');
    };

    $scope.saveIRSVerification = function(response) {
        if (response && response.verified) {
            Session.verifyIRSReport();
        } else {
            Session.unverifyIRSReport();
        }
        $location.path('/summaryMSA-IRS');
    };
};
