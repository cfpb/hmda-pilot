/*global jQuery:true*/

'use strict';

require('angular');
require('angular-mocks');

describe('Directive: Code Descriptions', function () {

    beforeEach(angular.mock.module('hmdaPilotApp'));

    var element,
        scope,
        $el,
        mockFileSpec = {
            transmittalSheet: {
                agencyCode: {
                    label: 'Agency Code',
                    validation: {
                        type: 'number',
                        values: {
                            '1': 'OCC',
                            '2': 'FRS',
                            '3': 'FDIC',
                            '5': 'NCUA',
                            '7': 'HUD',
                            '9': 'CFPB'
                        }
                    }
                }
            },
            loanApplicationRegister: {
                loanType: {
                    label: 'Loan Type',
                    validation: {
                        type: 'number',
                        'values': {
                            '1': 'Conventional (any loan other than FHA, VA, FSA, or RHS loans)',
                            '2': 'FHA-insured (Federal Housing Administration)',
                            '3': 'VA-guaranteed (Veterans Administration)',
                            '4': 'FSA/RHS (Farm Service Agency or Rural Housing Service)'
                         }
                     }
                }
            }
        };

    beforeEach(inject(function(_ngDialog_) {
        spyOn(_ngDialog_, 'open');
    }));

    beforeEach(angular.mock.module(function($provide) {
        $provide.value('HMDAEngine', {
            getFileSpec: function() { return mockFileSpec; }
        });
    }));

    beforeEach(inject(function($templateCache) {
        var directiveTemplate = null;
        var templateId = 'partials/codeDescriptions.html';
        var req = new XMLHttpRequest();
        req.onload = function() {
            directiveTemplate = this.responseText;
        };
        req.open('get', '/base/app/'+templateId, false);
        req.send();
        $templateCache.put(templateId, directiveTemplate);
    }));

    beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope.$new();
        element = angular.element('<code-descriptions></code-descriptions>');
        element = $compile(element)(scope);
        scope.$digest();
        $el = jQuery(element);
    }));

    describe('open', function() {
        it('should display a definition list', function () {
            expect($el.find('dl')).toBeDefined();
        });
    });
});
