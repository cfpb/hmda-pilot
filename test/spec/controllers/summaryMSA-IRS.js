'use strict';

require('angular');
require('angular-mocks');

describe('Controller: SummaryMSAIRSCtrl', function() {

    var scope,
        location,
        controller,
        Wizard,
        Session,
        mockEngine = {
            getErrors: function() { return mockErrors; },
            getRuleYear: function() { return '2015'; }
        },
        mockErrors = {
            special: {}
        };

    beforeEach(angular.mock.module('hmdaPilotApp'));

    beforeEach(inject(function($rootScope, $location, $controller, $q, _Wizard_, _Session_) {
        scope = $rootScope.$new();
        location = $location;
        controller = $controller;
        Wizard = _Wizard_;
        Session = _Session_;
        Wizard.initSteps();
        $controller('SummaryMSAIRSCtrl', {
            $scope: scope,
            $location: location,
            HMDAEngine: mockEngine,
            Wizard: _Wizard_,
            Session: _Session_
        });
    }));

    it('should include the special errors in the scope', function() {
        expect(scope.data.specialErrors).toEqual({});
    });

    describe('showIRSReport()', function() {
        describe('when the MSA edits have been verified', function() {
            it('should return true', function() {
                mockErrors.special = {};
                controller('SummaryMSAIRSCtrl', {
                    $scope: scope,
                    $location: location,
                    HMDAEngine: mockEngine
                });

                expect(scope.showIRSReport()).toBeTruthy();
            });
        });

        describe('when there are unverified MSA edits', function() {
            it('should return false', function() {
                mockErrors.special = {Q595: 'test'};
                controller('SummaryMSAIRSCtrl', {
                    $scope: scope,
                    $location: location,
                    HMDAEngine: mockEngine,
                    Session: Session
                });

                expect(scope.showIRSReport()).toBeFalsy();
            });
        });

        describe('when special errors end up null', function() {
            it('should return true', function() {
                scope.data.specialErrors = null;
                expect(scope.showIRSReport()).toBeTruthy();
            });
        });
    });

    describe('isIRSVerified()', function() {
        it('where the IRS report has been verified', function() {
            Session.verifyIRSReport();
            controller('SummaryMSAIRSCtrl', {
                $scope: scope,
                $location: location,
                HMDAEngine: mockEngine,
                Session: Session
            });
            expect(scope.isIRSVerified()).toBeTruthy();
        });

        it('where the IRS report has not been verified', function() {
            Session.unverifyIRSReport();
            controller('SummaryMSAIRSCtrl', {
                $scope: scope,
                $location: location,
                HMDAEngine: mockEngine,
                Session: Session
            });
            expect(scope.isIRSVerified()).toBeFalsy();
        });
    });

    describe('hasNext()', function() {
        describe('when the MSA edits and IRS report have been verified', function() {
            it('should return true', function() {
                mockErrors.special = {};
                Session.verifyIRSReport();
                controller('SummaryMSAIRSCtrl', {
                    $scope: scope,
                    $location: location,
                    HMDAEngine: mockEngine,
                    Session: Session
                });

                expect(scope.hasNext()).toBeTruthy();
            });
        });

        describe('when there are unverified MSA edits', function() {
            it('should return false', function() {
                mockErrors.special = {Q595: 'test'};
                Session.verifyIRSReport();
                controller('SummaryMSAIRSCtrl', {
                    $scope: scope,
                    $location: location,
                    HMDAEngine: mockEngine,
                    Session: Session
                });

                expect(scope.hasNext()).toBeFalsy();
            });
        });

        describe('when the IRS report has not been verified', function() {
            it('should return false', function() {
                mockErrors.special = {};
                Session.unverifyIRSReport();
                controller('SummaryMSAIRSCtrl', {
                    $scope: scope,
                    $location: location,
                    HMDAEngine: mockEngine,
                    Session: Session
                });

                expect(scope.hasNext()).toBeFalsy();
            });
        });
    });

    describe('next()', function() {
        beforeEach(function() {
            scope.next();
            scope.$digest();
        });

        it('should mark the current step in the wizard as complete', function() {
            var steps = Wizard.getSteps();
            expect(steps[0].isActive).toBeFalsy();
            expect(steps[0].status).toBe('complete');
        });

        it('should direct the user to the /validationSummary page', function() {
            expect(location.path()).toBe('/validationSummary');
        });
    });

    describe('previous()', function() {
        beforeEach(function() {
            scope.previous();
            scope.$digest();
        });

        it('should direct the user to the /summaryQualityMacro page', function() {
            expect(location.path()).toBe('/summaryQualityMacro');
        });
    });
});
