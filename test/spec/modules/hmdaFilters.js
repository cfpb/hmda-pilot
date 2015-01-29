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
        var FileMetadata,
            HMDAEngine,
            mockHmdaFile = {
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
                loanApplicationRegister: {
                    recordID:{
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
                getFileSpec: function(year) { return mockFileSpec; },
                getHmdaJson: function() { return mockHmdaFile }
            });
        }));

        it('should return the length of the input object\'s keys', angular.mock.inject(function(hmdaLabelFilter) {
            expect(hmdaLabelFilter('recordID', 'lar')).toBe('Record Identifier');
        }));
    });

    describe('capitalize', function() {
        it('should capitalize the first letter of the word', angular.mock.inject(function(capitalizeFilter) {
            expect(capitalizeFilter('test')).toBe('Test');
        }));
    });
});
