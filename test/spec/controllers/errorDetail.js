'use strict';

require('angular');
require('angular-mocks');

describe('Controller: ErrorDetailCtrl', function() {

    var scope,
        location,
        httpBackend,
        controller,
        HMDAEngine,
        Session,
        editType = 'syntactical',
        editId = 'S100',
        mockErrors = {syntactical: {S100:'errors for S100', S200:'errors for S200'} };

    beforeEach(angular.mock.module('hmdaPilotApp'));

    beforeEach(inject(function($controller, $rootScope, $location, $httpBackend, _HMDAEngine_, _Session_) {
        controller = $controller;
        scope = $rootScope.$new();
        httpBackend = $httpBackend;
        location = $location;
        HMDAEngine = _HMDAEngine_;
        Session = _Session_;
        HMDAEngine.getErrors = function() { return mockErrors; };
        $httpBackend
            .whenGET('data/macro-comments.json')
            .respond({Q100: ['Reason A', 'Reason B'], Q200: ['Reason C', 'Reason D']});

        controller('ErrorDetailCtrl', {
            $scope: scope,
            $routeParams: {
                EditType: editType,
                EditId: editId
            },
            HMDAEngine: HMDAEngine,
            Session: Session
        });
    }));

    describe('Initial scope', function() {
        it('should set the editType to the value from $routeParams', function() {
            expect(scope.editType).toBe(editType);
        });

        it('should set the editId to the value from $routeParams', function() {
            expect(scope.editId).toBe(editId);
        });

        it('should set the editError for the editType and editId', function() {
            expect(scope.editError).toBe('errors for S100');
        });

        it('should set the editError to an empty object if editType is not found', function() {
            controller('ErrorDetailCtrl', {
                $scope: scope,
                $routeParams: {
                    EditType: 'fail',
                    EditId: 'S100'
                },
                HMDAEngine: HMDAEngine
            });
            expect(scope.editError).toEqual({});
        });

        it('should set the editError to an empty object if editId is not found', function() {
            controller('ErrorDetailCtrl', {
                $scope: scope,
                $routeParams: {
                    EditType: 'syntactical',
                    EditId: 'S999'
                },
                HMDAEngine: HMDAEngine
            });
            expect(scope.editError).toEqual({});
        });

        describe('when editType is "macro"', function() {
            it('should define a list of reasons for the current Edit ID', function() {
                controller('ErrorDetailCtrl', {
                    $scope: scope,
                    $routeParams: {
                        EditType: 'macro',
                        EditId: 'Q100'
                    },
                    HMDAEngine: HMDAEngine
                });
                httpBackend.flush();
                expect(scope.reasonList).toEqual(['Reason A', 'Reason B']);
            });
        });
    });

    describe('backToSummary()', function() {
        describe('when editType is "syntactical"', function() {
            it('should direct the user to the summarySyntacticalValidity page', function() {
                scope.backToSummary();
                scope.$digest();
                expect(location.path()).toBe('/summarySyntacticalValidity');
            });
        });

        describe('when editType is "validity"', function() {
            it('should direct the user to the summarySyntacticalValidity page', function() {
                controller('ErrorDetailCtrl', {
                    $scope: scope,
                    $routeParams: {
                        EditType: 'validity',
                        EditId: 'S999'
                    },
                    HMDAEngine: HMDAEngine
                });

                scope.backToSummary();
                scope.$digest();
                expect(location.path()).toBe('/summarySyntacticalValidity');
            });
        });

        describe('when editType is "quality"', function() {
            it('should direct the user to the summaryQualityMacro page', function() {
                controller('ErrorDetailCtrl', {
                    $scope: scope,
                    $routeParams: {
                        EditType: 'quality',
                        EditId: 'S999'
                    },
                    HMDAEngine: HMDAEngine
                });

                scope.backToSummary();
                scope.$digest();
                expect(location.path()).toBe('/summaryQualityMacro');
            });
        });

        describe('when editType is "macro"', function() {
            it('should direct the user to the summaryQualityMacro page', function() {
                controller('ErrorDetailCtrl', {
                    $scope: scope,
                    $routeParams: {
                        EditType: 'macro',
                        EditId: 'S999'
                    },
                    HMDAEngine: HMDAEngine
                });

                scope.backToSummary();
                scope.$digest();
                expect(location.path()).toBe('/summaryQualityMacro');
            });
        });

        describe('when editType doesn\'t match a known type', function() {
            it('should direct the user to the home(/) page', function() {
                controller('ErrorDetailCtrl', {
                    $scope: scope,
                    $routeParams: {
                        EditType: 'test',
                        EditId: 'S999'
                    },
                    HMDAEngine: HMDAEngine
                });

                scope.backToSummary();
                scope.$digest();
                expect(location.path()).toBe('/');
            });
        });
    });

    describe('goToEditDetail()', function() {
        it('should redirect the user to a specific error detail page', function() {
            scope.goToEditDetail('V100');
            scope.$digest();
            expect(location.path()).toBe('/detail/syntactical/V100');
        });
    });

    describe('saveQualityVerification()', function() {
        describe('when edit has been verified', function() {
            beforeEach(function() {
                scope.response.verified = true;
                scope.saveQualityVerification();
            });

            it('should save the Edit ID to the session', function() {
                expect(Session.getVerifiedQualityEditIds()).toContain('S100');
            });

            it('should go to the next error in the list', function() {
                expect(location.path()).toBe('/detail/syntactical/S200');
            });
        });

        describe('when edit is not verified', function() {
            beforeEach(function() {
                scope.response.verified = false;
                scope.saveQualityVerification();
            });

            it('should save the Edit ID to the session', function() {
                expect(Session.getVerifiedQualityEditIds()).not.toContain('S100');
            });

            it('should go to the next error in the list', function() {
                expect(location.path()).toBe('/detail/syntactical/S200');
            });
        });
    });

    describe('saveMacroVerification()', function() {
        describe('when edit has been verified and a reason given', function() {
            beforeEach(function() {
                scope.response = {
                    verified: true,
                    reason: 'test'
                };
                scope.saveMacroVerification();
            });

            it('should save the Edit ID and reason to the session', function() {
                expect(Session.getVerifiedMacroEditIds()).toContain('S100');
            });

            it('should go to the next error in the list', function() {
                expect(location.path()).toBe('/detail/syntactical/S200');
            });
        });

        describe('when edit has been verified but no reason given', function() {
            beforeEach(function() {
                scope.response = {
                    verified: true,
                    reason: ''
                };
                scope.saveMacroVerification();
            });

            it('should save the Edit ID and reason to the session', function() {
                expect(Session.getVerifiedMacroEditIds()).not.toContain('S100');
            });

            it('should go to the next error in the list', function() {
                expect(location.path()).toBe('/detail/syntactical/S200');
            });
        });

        describe('when edit is not verified', function() {
            beforeEach(function() {
                scope.response = {
                    verified: false,
                    reason: ''
                };
                scope.saveMacroVerification();
            });

            it('should save the Edit ID and reason to the session', function() {
                expect(Session.getVerifiedMacroEditIds()).not.toContain('S100');
            });

            it('should go to the next error in the list', function() {
                expect(location.path()).toBe('/detail/syntactical/S200');
            });
        });
    });
});
