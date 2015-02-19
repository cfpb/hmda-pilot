'use strict';

require('angular-mocks');

describe('Filters: hmdaFilters', function() {

    beforeEach(angular.mock.module('hmdaFilters'));

    describe('keyLength', function() {
        it('should return the length of the input object\'s keys', angular.mock.inject(function(keyLengthFilter) {
            expect(keyLengthFilter({})).toBe(0);
            expect(keyLengthFilter({'foo': true})).toBe(1);
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
            mockMetadata = {
                filename: 'test.dat',
                activityYear: '2015',
                respondentID: '1234567890',
                totalLineEntries: '42'
            },
            mockFileMetadataService = {
                get: function() { return mockMetadata; }
            },
            mockFileSpec = {
                transmittalSheet: {
                    activityYear: {
                           label: 'Activity Year',
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
            $provide.value('FileMetadata', mockFileMetadataService);
            $provide.value('HMDAEngine', {
                getFileSpec: function() { return mockFileSpec; },
                getHmdaJson: function() { return mockHmdaFile; }
            });
        }));

        it('should return the length of the input object\'s keys for lar', angular.mock.inject(function(hmdaLabelFilter) {
            expect(hmdaLabelFilter({'property':'recordID', 'lineNumber':'2'}, 'lar')).toBe('Record Identifier');
        }));

        it('should return the length of the input object\'s keys for ts', angular.mock.inject(function(hmdaLabelFilter) {
            expect(hmdaLabelFilter({'property':'activityYear', 'lineNumber':'1'}, 'ts')).toBe('Activity Year');
        }));

        it('should return the length of the input object\'s keys for hmda and line 1', angular.mock.inject(function(hmdaLabelFilter) {
            expect(hmdaLabelFilter({'property':'activityYear', 'lineNumber':'1'}, 'hmda')).toBe('Activity Year');
        }));

        it('should return the length of the input object\'s keys for hmda and line != 1', angular.mock.inject(function(hmdaLabelFilter) {
            expect(hmdaLabelFilter({'property':'recordID', 'lineNumber':'x'}, 'hmda')).toBe('Record Identifier');
        }));

        it('should return the property as label when property can\'t be found and line 1', angular.mock.inject(function(hmdaLabelFilter) {
            expect(hmdaLabelFilter({'property':'Foo Bar', 'lineNumber':'1'}, 'hmda')).toBe('Foo Bar');
        }));

        it('should return the property as label when property can\'t be found and line != 1', angular.mock.inject(function(hmdaLabelFilter) {
            expect(hmdaLabelFilter({'property':'Bar Foo', 'lineNumber':'x'}, 'hmda')).toBe('Bar Foo');
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
});
