/*global jQuery:true*/

'use strict';

require('angular');
require('angular-mocks');

describe('Directive: ErrorDetail', function () {

    beforeEach(angular.mock.module('hmdaPilotApp'));

    beforeEach(angular.mock.module(function($provide){
        $provide.value('hmdaLabelFilter', function(input, scope){ return input + ' label'; });
    }));

    var element,
        scope,
        mockErrors = {"S270": {"scope": "ts", "explanation": "Century and/or year for action taken date does not match activity century/year.", "description": "Century (CC) and Year (YY) of action taken date must = activity century/year (CCYY) for period being processed.", "errors": [{"lineNumber": "1", "properties": {"actionDate": "2013", "transmittalSheet.activityYear": "2012"} },{"lineNumber": "1", "properties": {"actionDate": "2013", "transmittalSheet.activityYear": "2012"} }], "action": "Correct Entry and Resubmit"}, //jshint ignore:line
            "S271": {"scope": "lar", "explanation": "Century and/or year for action taken date does not match activity century/year.", "description": "Century (CC) and Year (YY) of action taken date must = activity century/year (CCYY) for period being processed.", "errors": [{"lineNumber": "1", "properties": {"actionDate": "2013", "transmittalSheet.activityYear": "2012"} },{"lineNumber": "1", "properties": {"actionDate": "2013", "transmittalSheet.activityYear": "2012"} }], "action": "Correct Entry and Resubmit"}}; //jshint ignore:line

    beforeEach(inject(function($templateCache) {
        var directiveTemplate = null;
        var templateId = 'partials/errorDetail.html';
        var req = new XMLHttpRequest();
        req.onload = function() {
            directiveTemplate = this.responseText;
        };
        req.open('get', '/base/app/'+templateId, false);
        req.send();
        $templateCache.put(templateId, directiveTemplate);
    }));

    describe('when there are errors', function() {

        var table;

        beforeEach(inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();
            scope.errorId = "S270";
            scope.error = mockErrors[scope.errorId];
            element = angular.element('<error-detail error="error"></error-detail>');
            element = $compile(element)(scope);
            scope.$digest();
            table = jQuery('table', element);
        }));

        it('should display a table of errors', function () {
            expect(table).toBeDefined();
            expect(table.hasClass('detail-table')).toBeTruthy();
        });

        describe('table', function() {
            it('should display column headers including Loan/Application Number when scope is \'lar\'', inject(function ($rootScope, $compile) {
                scope = $rootScope.$new();
                scope.errorId = "S271";
                scope.error = mockErrors[scope.errorId];
                element = angular.element('<error-detail error="error"></error-detail>');
                element = $compile(element)(scope);
                scope.$digest();
                table = jQuery('table', element);

                expect(jQuery('thead th:eq(0)', table).text()).toBe('Loan/Application Number');
                expect(jQuery('thead th:eq(0)', table).attr('scope')).toBe('col');

                expect(jQuery('thead th:eq(1)', table).text()).toBe('Field');
                expect(jQuery('thead th:eq(1)', table).attr('scope')).toBe('col');

                expect(jQuery('thead th:eq(2)', table).text()).toBe('Submitted Value');
                expect(jQuery('thead th:eq(2)', table).attr('scope')).toBe('col');

                expect(jQuery('thead th:eq(3)', table).text()).toBe('Action');
                expect(jQuery('thead th:eq(3)', table).attr('scope')).toBe('col');
            }));

            it('should display column headers including Line Number when scope is not \'lar\'', function() {
                expect(jQuery('thead th:eq(0)', table).text()).toBe('Line Number');
                expect(jQuery('thead th:eq(0)', table).attr('scope')).toBe('col');

                expect(jQuery('thead th:eq(1)', table).text()).toBe('Field');
                expect(jQuery('thead th:eq(1)', table).attr('scope')).toBe('col');

                expect(jQuery('thead th:eq(2)', table).text()).toBe('Submitted Value');
                expect(jQuery('thead th:eq(2)', table).attr('scope')).toBe('col');

                expect(jQuery('thead th:eq(3)', table).text()).toBe('Action');
                expect(jQuery('thead th:eq(3)', table).attr('scope')).toBe('col');
            });
        });
    });

    describe('when there are no errors', function() {
        beforeEach(inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();
            scope.error = {};
            element = angular.element('<error-detail error="error"></error-detail>');
            element = $compile(element)(scope);
            scope.$digest();
        }));

        it('should display a helpful message', function() {
            expect(jQuery('p', element).text()).toBe('No errors found.');
        });
    });
});
