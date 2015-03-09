/* global jQuery: true */

'use strict';

require('angular');
require('angular-mocks');

describe('Controller: SpecialErrorDetailCtrl', function () {

    var scope,
        location,
        Session,
        element,
        mockEngine = {
            getHmdaJson: function() { return {hmdaFile: { loanApplicationRegisters: []}}; },
        },
        mockErrors = {"Q595": {"scope": "hmda", "explanation": "Q595 explanation", "description": "Q595 description", "errors": [], "action": "Verify"}}; //jshint ignore:line

    beforeEach(angular.mock.module('hmdaPilotApp'));

    for (var i = 0; i < 10; i++) {
        mockErrors.Q595.errors.push({'LAR Count': 2, 'MSA/MD': '1000' + i, 'MSA/MD name': 'metro area'});
    }

    beforeEach(inject(function ($rootScope, $location, $controller, _Session_) {
        scope = $rootScope.$new();
        location = $location;
        Session = _Session_;

        $controller('SpecialErrorDetailCtrl', {
            $scope: scope,
            $location: location,
            HMDAEngine: mockEngine,
            Session: _Session_
        });
    }));

        describe('selecting all checkboxes on Q595', function() {
            beforeEach(inject(function ($rootScope, $compile) {
                scope = $rootScope.$new();
                scope.editId = 'Q595';
                scope.error = mockErrors[scope.editId];
                scope.editType = 'special';
                element = angular.element('<error-detail type="{{editType}}" error="error" edit="{{editId}}"></error-detail>');
                element = $compile(element)(scope);
                scope.$digest();
            }));

            it('should select all checkboxes when clicking Select All', function() {
                var $selectAll = jQuery('#selectAll', element);
                expect($selectAll.prop('checked')).toBeFalsy();
                for (var i = 0; i < 10; i++) {
                    expect(jQuery('#msa-' + i, element).attr('aria-checked')).toBe('false');
                }

                $selectAll.click();
                expect($selectAll.prop('checked')).toBeTruthy();
                for (i = 0; i < 10; i++) {
                    expect(jQuery('#msa-' + i, element).attr('aria-checked')).toBe('true');
                }
            });

            it('should select all checkboxes when clicking Select All if some are already checked', function() {
                var $selectAll = jQuery('#selectAll', element);
                expect($selectAll.prop('checked')).toBeFalsy();
                for (var i = 3; i < 7; i++) {
                    jQuery('#msa-' + i, element).click();
                }
                expect($selectAll.prop('checked')).toBeFalsy();
                $selectAll.click();

                expect($selectAll.prop('checked')).toBeTruthy();
                for (i = 0; i < 10; i++) {
                    expect(jQuery('#msa-' + i, element).attr('aria-checked')).toBe('true');
                }
            });

            it('should de-select all checkboxes when clicking Select All and all checkboxes are already checked', function() {
                var $selectAll = jQuery('#selectAll', element);
                expect($selectAll.prop('checked')).toBeFalsy();
                for (var i = 0; i < 10; i++) {
                    jQuery('#msa-' + i, element).click();
                }
                expect($selectAll.prop('checked')).toBeTruthy();

                $selectAll.click();
                expect($selectAll.prop('checked')).toBeFalsy();
                for (i = 0; i < 10; i++) {
                    expect(jQuery('#msa-' + i, element).attr('aria-checked')).toBe('false');
                }
            });
        });

});
