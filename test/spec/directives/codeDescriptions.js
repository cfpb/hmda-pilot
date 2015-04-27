/*global jQuery:true*/

'use strict';

require('angular');
require('angular-mocks');

describe('Directive: Code Descriptions', function() {

    beforeEach(angular.mock.module('hmdaPilotApp'));

    var element,
        scope,
        $el,
        HMDAEngine,
        ngDialog,
        mockFileSpec = {
            transmittalSheet: {
                recordID: {
                    label: 'Record Identifier',
                    validation: {
                        type: 'number',
                        canBeBlank: false,
                        canBeNA: false
                    }
                },
                respondentID: {
                    label: 'Respondent-ID',
                    validation: {
                        type: 'string',
                        canBeBlank: false,
                        canBeNA: false
                    }
                },
                agencyCode: {
                    label: 'Agency Code',
                    validation: {
                        type: 'number',
                        values: {
                            1: 'OCC',
                            2: 'FRS',
                            3: 'FDIC',
                            5: 'NCUA',
                            7: 'HUD',
                            9: 'CFPB'
                        }
                    }
                }
            },
            loanApplicationRegister: {
                loanType: {
                    label: 'Loan Type',
                    validation: {
                        type: 'number',
                        values: {
                            1: 'Conventional (any loan other than FHA, VA, FSA, or RHS loans)',
                            2: 'FHA-insured (Federal Housing Administration)',
                            3: 'VA-guaranteed (Veterans Administration)',
                            4: 'FSA/RHS (Farm Service Agency or Rural Housing Service)'
                        }
                    }
                }
            }
        };

    beforeEach(inject(function(_HMDAEngine_, _ngDialog_) {
        HMDAEngine = _HMDAEngine_;
        HMDAEngine.getFileSpec = function() { return mockFileSpec; };
        HMDAEngine.getRuleYear = function() { return '2013'; };
        ngDialog = _ngDialog_;
        spyOn(ngDialog, 'open');
    }));

    beforeEach(inject(function($templateCache) {
        var directiveTemplate = null;
        var templateId = 'partials/codeDescriptions.html';
        var req = new XMLHttpRequest();
        req.onload = function() {
            directiveTemplate = this.responseText;
        };
        req.open('get', '/base/app/' + templateId, false);
        req.send();
        $templateCache.put(templateId, directiveTemplate);
    }));

    beforeEach(inject(function($rootScope, $compile) {
        scope = $rootScope.$new();
        element = angular.element('<button code-descriptions></button>');
        element = $compile(element)(scope);
        scope.$digest();
        $el = jQuery(element);
    }));

    describe('when applied to an element', function() {
        it('should open a modal when clicked', function() {
            $el.click();
            expect(ngDialog.open).toHaveBeenCalled();
        });
    });
});
