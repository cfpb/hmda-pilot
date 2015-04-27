'use strict';

/**
 * Provides the scope and functions for the IRS Report view
 *
 * @namespace hmdaPilotApp
 * @module {Controller} IRSReport
 */
module.exports = /*@ngInject*/ function($scope, $location, $q, HMDAEngine, Session) {

    var hmdaFile = HMDAEngine.getHmdaJson().hmdaFile;

    /* istanbul ignore if debug */
    if (HMDAEngine.getDebug()) {
        console.time('total time for IRS report');
    }

    // Initialize scope
    HMDAEngine.getTotalsByMSA(hmdaFile).then(function(response) {

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
