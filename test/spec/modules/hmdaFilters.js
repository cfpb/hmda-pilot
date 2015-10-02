'use strict';

require('angular-mocks');

describe('Filters: hmdaFilters', function() {

    beforeEach(angular.mock.module('hmdaFilters'));

    describe('keyLength', function() {
        it('should return the length of the input object\'s keys', angular.mock.inject(function(keyLengthFilter) {
            expect(keyLengthFilter({})).toBe(0);
            expect(keyLengthFilter({foo: true})).toBe(1);
        }));
    });

    describe('hmdaLabel', function() {
        var mockHmdaFile = {
                hmdaFile: {
                    transmittalSheet: {
                        activityYear: '2015',
                        respondentID: '1234567890',
                        totalLineEntries: '100'
                    }
                }
            },
            mockFileSpec = {
                transmittalSheet: {
                    activityYear: {
                        label: 'Activity Year'
                    }
                },
                loanApplicationRegister: {
                    recordID: {
                        element: '01',
                        label: 'Record Identifier',
                        start: '1',
                        end: '1',
                        length: '1',
                        dataType: 'N',
                        description: 'Value is 2'
                    }
                }
            };

        beforeEach(angular.mock.module(function($provide) {
            $provide.value('HMDAEngine', {
                getFileSpec: function() { return mockFileSpec; },
                getHmdaJson: function() { return mockHmdaFile; },
                getRuleYear: function() { return '2015'; }
            });
        }));

        it('should return the length of the input object\'s keys for lar', angular.mock.inject(function(hmdaLabelFilter) {
            expect(hmdaLabelFilter({property:'recordID', lineNumber:'2'}, 'lar')).toBe('Record Identifier');
        }));

        it('should return the length of the input object\'s keys for ts', angular.mock.inject(function(hmdaLabelFilter) {
            expect(hmdaLabelFilter({property:'activityYear', lineNumber:'1'}, 'ts')).toBe('Activity Year');
        }));

        it('should return the length of the input object\'s keys for hmda and line 1', angular.mock.inject(function(hmdaLabelFilter) {
            expect(hmdaLabelFilter({property:'activityYear', lineNumber:'1'}, 'hmda')).toBe('Activity Year');
        }));

        it('should return the length of the input object\'s keys for hmda and line != 1', angular.mock.inject(function(hmdaLabelFilter) {
            expect(hmdaLabelFilter({property:'recordID', lineNumber:'x'}, 'hmda')).toBe('Record Identifier');
        }));

        it('should return the length of the input object\'s keys for hmda and dot notation ts property', angular.mock.inject(function(hmdaLabelFilter) {
            expect(hmdaLabelFilter({property:'transmittalSheet.activityYear', lineNumber:'2'}, 'hmda')).toBe('Activity Year');
        }));

        it('should return the property as label when property can\'t be found and line 1', angular.mock.inject(function(hmdaLabelFilter) {
            expect(hmdaLabelFilter({property:'Foo Bar', lineNumber:'1'}, 'hmda')).toBe('Foo Bar');
        }));

        it('should return the property as label when property can\'t be found and line != 1', angular.mock.inject(function(hmdaLabelFilter) {
            expect(hmdaLabelFilter({property:'Bar Foo', lineNumber:'x'}, 'hmda')).toBe('Bar Foo');
        }));
    });

    describe('hmdaValue', function() {
        var sampleDate, sampleDateTime,
            now = new Date(),
            mockHmdaFile = {
                hmdaFile: {
                    transmittalSheet: {
                        activityYear: '2015',
                        respondentID: '1234567890',
                        totalLineEntries: '100'
                    }
                }
            },
            mockFileSpec = {
                loanApplicationRegister: {
                    invalid: { },
                    string: { validation: { type: 'string' } },
                    number: { validation: { type: 'number' } },
                    currency: { validation: { type: 'currency', multiplier: 1000 } },
                    percent: { validation: { type: 'percent'} },
                    shortDate: { validation: { type: 'date', match: 'yyyyMMdd'} },
                    longDate: { validation: { type: 'date', match: 'yyyyMMddHHmm'} }
                }
            };

        beforeEach(angular.mock.module(function($provide) {
            $provide.value('HMDAEngine', {
                getFileSpec: function() { return mockFileSpec; },
                getHmdaJson: function() { return mockHmdaFile; },
                getRuleYear: function() { return '2015'; }
            });

            Date.prototype.getMonthFormatted = function() {
                var month = this.getMonth();
                return month < 9 ? '0' + (month + 1) : month + 1;
            };

            Date.prototype.getDateFormatted = function() {
                var date = this.getDate();
                return date < 10 ? '0' + date : date;
            };

            Date.prototype.getHoursFormatted = function() {
                var hours = this.getHours();
                return hours < 10 ? '0' + hours : hours;
            };

            Date.prototype.getMinutesFormatted = function() {
                var mins = this.getMinutes();
                return mins < 10 ? '0' + mins : mins;
            };

            Date.prototype.formatCFPBDate = function() {
                return this.getMonth() + 1 + '/' + this.getDate() + '/' + this.getFullYear();
            };

            Date.prototype.formatCFPBDatetime = function() {
                return this.getMonth() + 1 + '/' + this.getDate() + '/' + this.getFullYear() + ' ' + this.getHours() + ':' + this.getMinutesFormatted();
            };

            sampleDate = now.getFullYear().toString() + now.getMonthFormatted().toString() + now.getDateFormatted().toString();
            sampleDateTime = sampleDate + now.getHoursFormatted().toString() + now.getMinutesFormatted().toString();

        }));

        it('should not format a file-spec property unless it has a validation property', angular.mock.inject(function(hmdaValueFilter) {
            expect(hmdaValueFilter('test', 'lar', 'invalid')).toBe('test');
        }));

        it('should not format a file-spec property of type string', angular.mock.inject(function(hmdaValueFilter) {
            expect(hmdaValueFilter('test', 'lar', 'string')).toBe('test');
        }));

        it('should not format a file-spec property of type number', angular.mock.inject(function(hmdaValueFilter) {
            expect(hmdaValueFilter('100', 'lar', 'number')).toBe('100');
        }));

        it('should not format a value of NA', angular.mock.inject(function(hmdaValueFilter) {
            expect(hmdaValueFilter('NA', 'lar', 'percent')).toBe('NA');
        }));

        it('should format a file-spec property of type percent', angular.mock.inject(function(hmdaValueFilter) {
            expect(hmdaValueFilter('12.34', 'lar', 'percent')).toBe('12.34%');
        }));

        it('should format a file-spec property of type date that matches yyyyMMdd', angular.mock.inject(function(hmdaValueFilter) {
            expect(hmdaValueFilter(sampleDate, 'lar', 'shortDate')).toBe(now.formatCFPBDate());
        }));

        it('should format a file-spec property of type date that matches yyyyMMddHHmm', angular.mock.inject(function(hmdaValueFilter) {
            expect(hmdaValueFilter(sampleDateTime, 'lar', 'longDate')).toBe(now.formatCFPBDatetime());
        }));

        it('should format a file-spec property of type currency', angular.mock.inject(function(hmdaValueFilter) {
            expect(hmdaValueFilter('123', 'lar', 'currency')).toBe('$123,000');
        }));
    });

    describe('hmdaMacroValue', function() {
        beforeEach(angular.mock.module(function($provide) {
            // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
            $provide.value('HMDAEngine', {
                starts_with: function(key, prefix) { return key.indexOf(prefix) === 0; },
                ends_with: function(key, suffix) { return key.indexOf(suffix, key.length - suffix.length) !== -1; }
            });
        }));

        it('should format percentange values', angular.mock.inject(function(hmdaMacroValueFilter) {
            expect(hmdaMacroValueFilter('12.34', '% of Total')).toBe('12.34%');
            expect(hmdaMacroValueFilter('12.34', '% Difference')).toBe('12.34%');
            expect(hmdaMacroValueFilter('12.34', 'Previous Year Percentage')).toBe('12.34%');
        }));

        it('should format dollar amount values', angular.mock.inject(function(hmdaMacroValueFilter) {
            expect(hmdaMacroValueFilter('12400', 'Total Dollar')).toBe('$12,400');
        }));
    });

    describe('capitalize', function() {
        it('should capitalize the first letter of the word', angular.mock.inject(function(capitalizeFilter) {
            expect(capitalizeFilter('test')).toBe('Test');
        }));
    });

    describe('paginate', function() {
        it('should paginate the input', angular.mock.inject(function(paginateFilter) {
            expect(paginateFilter([1, 2, 3], 1, 1)).toEqual([1]);
            expect(paginateFilter([1, 2, 3], 1, 3)).toEqual([1, 2, 3]);
            expect(paginateFilter([1, 2, 3], 2, 3)).toEqual([2, 3]);
        }));
    });

    describe('agency', function() {
        it('should return the the agency name matching the code', angular.mock.inject(function(agencyFilter) {
            expect(agencyFilter('1')).toBe('OCC');
            expect(agencyFilter('2')).toBe('FRS');
            expect(agencyFilter('3')).toBe('FDIC');
            expect(agencyFilter('5')).toBe('NCUA');
            expect(agencyFilter('7')).toBe('HUD');
            expect(agencyFilter('9')).toBe('CFPB');
        }));

        it('should return and empty string if the agencyCode is not found', angular.mock.inject(function(agencyFilter) {
            expect(agencyFilter('100')).toBe('');
        }));
    });

    describe('entries', function() {
        it('should format a single entry', angular.mock.inject(function(entriesFilter) {
            expect(entriesFilter(1)).toBe('(1 entry)');
        }));

        it('should format a multiple entries', angular.mock.inject(function(entriesFilter) {
            expect(entriesFilter(2)).toBe('(2 entries)');
        }));
    });
});
