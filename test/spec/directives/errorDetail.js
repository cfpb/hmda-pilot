/*global jQuery:true*/

'use strict';

require('angular');
require('angular-mocks');

describe('Directive: ErrorDetail', function () {

    beforeEach(angular.mock.module('hmdaPilotApp'));

    beforeEach(angular.mock.module(function($provide){
        $provide.value('hmdaLabelFilter', function(input){ return input + ' label'; });
    }));

    var element,
        scope,
        mockErrors = {"S270": {"scope": "ts", "explanation": "Century and/or year for action taken date does not match activity century/year.", "description": "Century (CC) and Year (YY) of action taken date must = activity century/year (CCYY) for period being processed.", "errors": [], "action": "Correct Entry and Revalidate"}, //jshint ignore:line
            "S271": {"scope": "lar", "explanation": "Century and/or year for action taken date does not match activity century/year.", "description": "Century (CC) and Year (YY) of action taken date must = activity century/year (CCYY) for period being processed.", "errors": [{"lineNumber": "1", "properties": {"actionDate": "2013", "transmittalSheet.activityYear": "2012"} },{"lineNumber": "1", "properties": {"actionDate": "2013", "transmittalSheet.activityYear": "2012"} }], "action": "Correct Entry and Revalidate"}, //jshint ignore:line
            "Q595": {"scope": "hmda", "explanation": "Q595 explanation", "description": "Q595 description", "errors": [], "action": "Verify"}}; //jshint ignore:line

    for (var i = 0; i < 20; i++) {
        mockErrors.S270.errors.push({'lineNumber': '1', 'properties': {'actionDate': '2013', 'transmittalSheet.activityYear': '2012'} },{'lineNumber': '1', 'properties': {'actionDate': '2013', 'transmittalSheet.activityYear': '2012'} });
    }

    for (i = 0; i < 10; i++) {
        mockErrors.Q595.errors.push({'LAR Count': 2, 'MSA/MD': '1000' + i, 'MSA/MD name': 'metro area'});
    }

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
        templateId = 'partials/errorDetail-Q595.html';
        req = new XMLHttpRequest();
        req.onload = function() {
            directiveTemplate = this.responseText;
        };
        req.open('get', '/base/app/'+templateId, false);
        req.send();
        $templateCache.put(templateId, directiveTemplate);
    }));

    beforeEach(inject(function($templateCache) {
        var directiveTemplate = null;
        var templateId = 'partials/errorDetail-macro.html';
        var req = new XMLHttpRequest();
        req.onload = function() {
            directiveTemplate = this.responseText;
        };
        req.open('get', '/base/app/'+templateId, false);
        req.send();
        $templateCache.put(templateId, directiveTemplate);
    }));

    describe('when there are errors', function() {

        var $table;

        beforeEach(inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();
            scope.errorId = 'S270';
            scope.error = mockErrors[scope.errorId];
            scope.editType = 'syntactical';
            element = angular.element('<error-detail type="{{editType}}" error="error"></error-detail>');
            element = $compile(element)(scope);
            scope.$digest();
            $table = jQuery('table', element);
        }));

        it('should display a table of errors', function () {
            expect($table).toBeDefined();
            expect($table.hasClass('error-detail')).toBeTruthy();
        });

        describe('table for syntactical, validity or quality errors', function() {
            it('should display column headers including Loan/Application Number when scope is \'lar\'', inject(function ($rootScope, $compile) {
                scope = $rootScope.$new();
                scope.errorId = 'S271';
                scope.error = mockErrors[scope.errorId];
                scope.editType = 'syntactical';
                element = angular.element('<error-detail type="{{editType}}" error="error"></error-detail>');
                element = $compile(element)(scope);
                scope.$digest();
                $table = jQuery('table', element);

                expect(jQuery('thead th:eq(0)', $table).text()).toBe('Loan/Application Number');
                expect(jQuery('thead th:eq(0)', $table).attr('scope')).toBe('col');

                expect(jQuery('thead th:eq(1)', $table).text()).toBe('Field');
                expect(jQuery('thead th:eq(1)', $table).attr('scope')).toBe('col');

                expect(jQuery('thead th:eq(2)', $table).text()).toBe('Submitted Value');
                expect(jQuery('thead th:eq(2)', $table).attr('scope')).toBe('col');

                expect(jQuery('thead th:eq(3)', $table).text()).toBe('Action');
                expect(jQuery('thead th:eq(3)', $table).attr('scope')).toBe('col');
            }));

            it('should display column headers including Line Number when scope is not \'lar\'', function() {
                expect(jQuery('thead th:eq(0)', $table).text()).toBe('Line Number');
                expect(jQuery('thead th:eq(0)', $table).attr('scope')).toBe('col');

                expect(jQuery('thead th:eq(1)', $table).text()).toBe('Field');
                expect(jQuery('thead th:eq(1)', $table).attr('scope')).toBe('col');

                expect(jQuery('thead th:eq(2)', $table).text()).toBe('Submitted Value');
                expect(jQuery('thead th:eq(2)', $table).attr('scope')).toBe('col');

                expect(jQuery('thead th:eq(3)', $table).text()).toBe('Action');
                expect(jQuery('thead th:eq(3)', $table).attr('scope')).toBe('col');
            });
        });

        describe('table for macro errors', function() {
            it('should display the properties for the macro error', inject(function ($rootScope, $compile) {
                scope = $rootScope.$new();
                scope.errorId = 'S271';
                scope.error = mockErrors[scope.errorId];
                scope.editType = 'macro';
                element = angular.element('<error-detail type="{{editType}}" error="error"></error-detail>');
                element = $compile(element)(scope);
                scope.$digest();
                $table = jQuery('table', element);

                expect($table.hasClass('macro-detail')).toBeTruthy();

                expect(jQuery('tbody th:eq(0)', $table).text()).toBe('actionDate');
                expect(jQuery('tbody th:eq(0)', $table).attr('scope')).toBe('row');
                expect(jQuery('tbody th:eq(0)', $table).hasClass('property')).toBeTruthy();

                expect(jQuery('tbody td:eq(0)', $table).text()).toBe('2013');
                expect(jQuery('tbody td:eq(0)', $table).hasClass('value')).toBeTruthy();

                expect(jQuery('tbody th:eq(1)', $table).text()).toBe('transmittalSheet.activityYear');
                expect(jQuery('tbody th:eq(1)', $table).attr('scope')).toBe('row');
                expect(jQuery('tbody th:eq(1)', $table).hasClass('property')).toBeTruthy();

                expect(jQuery('tbody td:eq(1)', $table).text()).toBe('2012');
                expect(jQuery('tbody td:eq(1)', $table).hasClass('value')).toBeTruthy();
            }));
        });

        describe('pagination', function() {
            var $pagination,
                    $pageSize;
            beforeEach(function() {
                $pagination = jQuery('nav', element);
                $pageSize = jQuery('div.page-size', element);
            });

            it('should have a list of possible page sizes defaulting to 10', function() {
                expect($pageSize).toBeDefined();
                expect(jQuery('option', $pageSize).length).toBe(4);
                expect(jQuery('option:selected', $pageSize).text()).toBe('10');
            });

            it('should have a reset to the first page when switching the page size', function() {
                var $currentPage = jQuery('#pagination_current-page', $pagination);
                var $nextButton = jQuery('button.pagination_next', $pagination);
                var $pageSizeSelect = jQuery('select', $pageSize);
                $nextButton.click();
                expect($currentPage.val()).toBe('2');
                $pageSizeSelect.val('1');
                $pageSizeSelect.trigger('change');
                expect(jQuery('option:selected', $pageSizeSelect).text()).toBe('20');
                expect($currentPage.val()).toBe('1');
            });

            it('should have previous and next buttons', function() {
                expect($pagination).toBeDefined();
                expect(jQuery('button.pagination_prev', $pagination)).toBeDefined();
                expect(jQuery('button.pagination_next', $pagination)).toBeDefined();
            });

            it('should have previous and next buttons', function() {
                expect($pagination).toBeDefined();
                expect(jQuery('button.pagination_prev', $pagination)).toBeDefined();
                expect(jQuery('button.pagination_next', $pagination)).toBeDefined();
            });

            it('should advance page when clicking next and back when clicking prev', function() {
                var $currentPage = jQuery('#pagination_current-page', $pagination);
                var $nextButton = jQuery('button.pagination_next', $pagination);
                var $prevButton = jQuery('button.pagination_prev', $pagination);
                expect($nextButton.disabled).toBeFalsy();
                expect($currentPage.val()).toBe('1');
                $nextButton.click();
                expect($currentPage.val()).toBe('2');
                expect($prevButton.disabled).toBeFalsy();
                $prevButton.click();
                expect($currentPage.val()).toBe('1');
            });

            it('should display the which errors are being displayed out of how many total', function() {
                expect($pageSize.text()).toMatch(/Showing \d+ - \d+ of \d+/);
            });

            it('should jump to the chosen page when using the \'Go\' button', function() {
                var $go = jQuery('button.pagination_submit', $pagination);
                var $currentPage = jQuery('#pagination_current-page', $pagination);
                $currentPage = 2;
                $go.click();
                expect($currentPage).toBe(2);
            });
        });

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

    describe('when there are no errors', function() {
        beforeEach(inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();
            scope.error = {};
            scope.editType = 'syntactical';
            element = angular.element('<error-detail type="{{editType}}" error="error"></error-detail>');
            element = $compile(element)(scope);
            scope.$digest();
        }));

        it('should display a helpful message', function() {
            expect(jQuery('p', element).text()).toBe('No errors found.');
        });
    });
});
