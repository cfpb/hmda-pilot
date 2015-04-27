'use strict';

require('angular');
require('angular-mocks');

describe('Controller: IRSReportCtrl', function() {

    var scope,
        location,
        Session,
        mockEngine = {
            getHmdaJson: function() { return {hmdaFile: { loanApplicationRegisters: []}}; },
            getTotalsByMSA: function() { return []; }
        };

    beforeEach(angular.mock.module('hmdaPilotApp'));

    beforeEach(inject(function($rootScope, $location, $controller, _Session_) {
        scope = $rootScope.$new();
        location = $location;
        Session = _Session_;

        $controller('IRSReportCtrl', {
            $scope: scope,
            $location: location,
            HMDAEngine: mockEngine,
            Session: _Session_
        });
    }));

    // TODO: Add support for returning resolving the promise.
    // describe('initial scope', function() {
    //     it('should include the report data', function() {
    //         expect(scope.reportData).toBeDefined();
    //     });
    // });
    //
    // describe('backToSummary()', function() {
    //     it('should direct the user to the /summaryMSA-IRS page', function() {
    //         scope.backToSummary();
    //         scope.$digest();
    //         expect(location.path()).toBe('/summaryMSA-IRS');
    //     });
    // });
    //
    // describe('saveIRSVerification()', function() {
    //     describe('when IRS report has been verified', function() {
    //         beforeEach(function() {
    //             scope.saveIRSVerification({verified: true});
    //             scope.$digest();
    //         });
    //
    //         it('should save the Edit ID to the session', function() {
    //             expect(Session.hasVerifiedIRSReport()).toBeTruthy();
    //         });
    //     });
    //
    //     describe('when IRS report is not verified', function() {
    //         beforeEach(function() {
    //             scope.saveIRSVerification({verified: false});
    //             scope.$digest();
    //         });
    //
    //         it('should save the Edit ID to the session', function() {
    //             expect(Session.hasVerifiedIRSReport()).toBeFalsy();
    //         });
    //     });
    // });
});
