'use strict';

/**
 * @ngdoc function
 * @name hmdaPilotApp.controller:IRSReportCtrl
 * @description
 * # IRSReportCtrl
 * Controller of the hmdaPilotApp
 */
module.exports = /*@ngInject*/ function ($scope, $location, HMDAEngine, Session) {

    var LARs = HMDAEngine.getHmdaJson().hmdaFile.loanApplicationRegisters;

    // Initialize scope
    $scope.reportData = HMDAEngine.getTotalsByMSA(LARs);
    $scope.verified = Session.hasVerifiedIRSReport();
    $scope.canVerify = $scope.verified;

    $scope.backToSummary = function() {
        $location.path('/summaryMSA-IRS');
    };

    $scope.saveIRSVerification = function(response) {
        if (response && response.verified) {
            console.log('here?');
            Session.verifyIRSReport();
        } else {
            Session.unverifyIRSReport();
        }
        $location.path('/summaryMSA-IRS');
    };
};
