/*global jQuery:true*/

'use strict';

require('angular');
require('angular-mocks');

describe('Directive: ErrorSummary', function() {

    beforeEach(angular.mock.module('hmdaPilotApp'));

    var element,
        scope,
        mockErrors = {S270: {scope: 'ts', explanation: 'Century and/or year for action taken date does not match activity century/year.', description: 'Century (CC) and Year (YY) of action taken date must = activity century/year (CCYY) for period being processed.', errors: [{lineNumber: '1', properties: {actionDate: '2013', 'transmittalSheet.activityYear': '2012'} }, {lineNumber: '1', properties: {actionDate: '2013', 'transmittalSheet.activityYear': '2012'} }], action: 'Correct Entry and Revalidate'}};

    beforeEach(inject(function($templateCache) {
        var directiveTemplate = null;
        var templateId = 'partials/errorSummary-count.html';
        var req = new XMLHttpRequest();
        req.onload = function() {
            directiveTemplate = this.responseText;
        };
        req.open('get', '/base/app/' + templateId, false);
        req.send();
        $templateCache.put(templateId, directiveTemplate);
    }));

    beforeEach(inject(function($templateCache) {
        var directiveTemplate = null;
        var templateId = 'partials/errorSummary-verify.html';
        var req = new XMLHttpRequest();
        req.onload = function() {
            directiveTemplate = this.responseText;
        };
        req.open('get', '/base/app/' + templateId, false);
        req.send();
        $templateCache.put(templateId, directiveTemplate);
    }));

    beforeEach(inject(function($templateCache) {
        var directiveTemplate = null;
        var templateId = 'partials/errorSummary-special.html';
        var req = new XMLHttpRequest();
        req.onload = function() {
            directiveTemplate = this.responseText;
        };
        req.open('get', '/base/app/' + templateId, false);
        req.send();
        $templateCache.put(templateId, directiveTemplate);
    }));

    describe('when there are Syntactical or Validity errors', function() {
        var table;

        beforeEach(inject(function($rootScope, $compile) {
            scope = $rootScope.$new();
            scope.errors = mockErrors;
            element = angular.element('<error-summary type="syntactical" errors="errors"></error-summary>');
            element = $compile(element)(scope);
            scope.$digest();
            table = jQuery('table', element);
        }));

        it('should display a table of errors', function() {
            expect(table).toBeDefined();
            expect(table.hasClass('error-summary')).toBeTruthy();
        });

        describe('table', function() {
            it('should display column headers', function() {
                expect(jQuery('thead th:eq(0)', table).text()).toBe('Edit Identifier');
                expect(jQuery('thead th:eq(0)', table).attr('scope')).toBe('col');

                expect(jQuery('thead th:eq(1)', table).text()).toBe('Error Explanation');
                expect(jQuery('thead th:eq(1)', table).attr('scope')).toBe('col');

                expect(jQuery('thead th:eq(2)', table).text()).toBe('Number of Errors');
                expect(jQuery('thead th:eq(2)', table).attr('scope')).toBe('col');
            });
        });
    });

    describe('when there are Quality or Macro errors', function() {
        var table;

        beforeEach(inject(function($rootScope, $compile) {
            scope = $rootScope.$new();
            scope.errors = mockErrors;
            element = angular.element('<error-summary type="quality" errors="errors"></error-summary>');
            element = $compile(element)(scope);
            scope.$digest();
            table = jQuery('table', element);
        }));

        it('should display a table of errors', function() {
            expect(table).toBeDefined();
            expect(table.hasClass('error-summary')).toBeTruthy();
        });

        describe('table', function() {
            it('should display column headers', function() {
                expect(jQuery('thead th:eq(0)', table).text()).toBe('Edit Identifier');
                expect(jQuery('thead th:eq(0)', table).attr('scope')).toBe('col');

                expect(jQuery('thead th:eq(1)', table).text()).toBe('Error Explanation');
                expect(jQuery('thead th:eq(1)', table).attr('scope')).toBe('col');

                expect(jQuery('thead th:eq(2)', table).text()).toBe('Verification');
                expect(jQuery('thead th:eq(2)', table).attr('scope')).toBe('col');
            });
        });
    });

    describe('when there are "special" edit errors (Q029 & Q595)', function() {
        var table;

        beforeEach(inject(function($rootScope, $compile) {
            scope = $rootScope.$new();
            scope.errors = mockErrors;
            element = angular.element('<error-summary type="special" errors="errors"></error-summary>');
            element = $compile(element)(scope);
            scope.$digest();
            table = jQuery('table', element);
        }));

        it('should display a table of errors', function() {
            expect(table).toBeDefined();
            expect(table.hasClass('error-summary')).toBeTruthy();
        });

        describe('table', function() {
            it('should display column headers', function() {
                expect(jQuery('thead th:eq(0)', table).text()).toBe('Report');
                expect(jQuery('thead th:eq(0)', table).attr('scope')).toBe('col');

                expect(jQuery('thead th:eq(1)', table).text()).toBe('Description');
                expect(jQuery('thead th:eq(1)', table).attr('scope')).toBe('col');

                expect(jQuery('thead th:eq(2)', table).text()).toBe('Verification');
                expect(jQuery('thead th:eq(2)', table).attr('scope')).toBe('col');
            });
        });
    });

    describe('when there are no errors', function() {
        beforeEach(inject(function($rootScope, $compile) {
            scope = $rootScope.$new();
            scope.errors = {};
            element = angular.element('<error-summary type="test" errors="errors"></error-summary>');
            element = $compile(element)(scope);
            scope.$digest();
        }));

        it('should display a helpful message', function() {
            expect(jQuery('p', element).text()).toBe('No test errors found.');
        });
    });
});
