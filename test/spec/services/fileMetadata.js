'use strict';

require('angular');
require('angular-mocks');

describe('Service: FileMetadata', function() {

    var service,
        HMDAEngine,
        mockHmdaFile = {
            hmdaFile: {
                transmittalSheet: {
                    activityYear: '2015',
                    respondentID: '1234567890',
                    totalLineEntries: '100'
                }
            }
        };

    beforeEach(angular.mock.module('hmdaPilotApp'));

    beforeEach(inject(function(_FileMetadata_, _HMDAEngine_) {
        service = _FileMetadata_;
        HMDAEngine = _HMDAEngine_;
    }));

    describe('refresh()', function() {
        describe('when the rule-engine has processed the file', function() {
            beforeEach(function() {
                HMDAEngine.setHmdaJson(mockHmdaFile);
                service.setFilename('test.dat');
                service.refresh();
            });

            it('should return a metadata object', function() {
                var metadata = service.get();
                expect(metadata.filename).toBe('test.dat');
                expect(metadata.activityYear).toBe('2015');
                expect(metadata.respondentID).toBe('1234567890');
                expect(metadata.totalLineEntries).toBe('100');
            });
        });

        describe('when the rule-engine has not processed the file', function() {
            beforeEach(function() {
                HMDAEngine.setHmdaJson({});
            });

            it('should return an empty object', function() {
                expect(service.refresh()).toEqual({});
            });
        });
    });

    describe('clear()', function() {
        beforeEach(function() {
            HMDAEngine.setHmdaJson(mockHmdaFile);
            service.setFilename('test.dat');
        });

        it('should return an empty object', function() {
            expect(service.clear()).toEqual({});
        });
    });
});
