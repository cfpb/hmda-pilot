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
    if (HMDAEngine.getDebug()) {
        console.time('total time for IRS report');
    }
    // Initialize scope
    HMDAEngine.getTotalsByMSA(LARs).then(function(response) {
        if (HMDAEngine.getDebug()) {
            console.timeEnd('total time for IRS report');
        }
        $scope.reportData = response;
        $scope.$apply();
    });
    $scope.verified = Session.hasVerifiedIRSReport();
    $scope.canVerify = $scope.verified;

    // TODO Refactor out the pagination from here and the errorDetail so that the
    // same code can be used in different controllers
    $scope.pageSize = $scope.pageSize || 10;
    $scope.currentPage = $scope.currentPage || 1;

    $scope.$watch(function() {
        return $scope.isLastPage();
    }, function(isLastPage) {
        if (isLastPage) {
            $scope.canVerify = true;
        }
    });

    $scope.start = function() {
        return ($scope.currentPage-1) * $scope.pageSize + 1;
    };

    $scope.end = function() {
        var end = $scope.currentPage * $scope.pageSize;
        return end > $scope.total() ? $scope.total() : end;
    };

    $scope.total = function() {
        return $scope.reportData ? $scope.reportData.length : 0;
    };

    $scope.totalPages = function() {
        return Math.ceil($scope.total() / $scope.pageSize);
    };

    $scope.hasPrev = function() {
        return $scope.currentPage > 1;
    };

    $scope.onPrev = function() {
        $scope.currentPage--;
    };

    $scope.hasNext = function() {
        return $scope.currentPage < $scope.totalPages();
    };

    $scope.onNext = function() {
        $scope.currentPage++;
    };

    $scope.isLastPage = function() {
        return $scope.currentPage === $scope.totalPages();
    };

    $scope.setCurrentPage = function(page) {
        $scope.currentPage = page;
    };

    $scope.setPageSize = function(pageSize) {
        $scope.pageSize = pageSize;
        $scope.currentPage = 1;
    };

    $scope.showPagination = function() {
        return $scope.totalPages() !== 1;
    };

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
