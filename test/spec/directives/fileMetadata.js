/*global jQuery:true*/

'use strict';

require('angular');
require('angular-mocks');

describe('Directive: FileMetadata', function() {

    beforeEach(angular.mock.module('hmdaPilotApp'));

    var element,
        scope,
        mockMetadata = {
            filename: 'test.dat',
            activityYear: '2015',
            respondentID: '1234567890',
            totalLineEntries: '42'
        },
        mockFileMetadataService = {
            get: function() { return mockMetadata; }
        };

    beforeEach(function() {
        angular.mock.module(function($provide) {
            $provide.value('FileMetadata', mockFileMetadataService);
        });
    });

    beforeEach(inject(function($templateCache) {
        var directiveTemplate = null;
        var templateId = 'partials/fileMetadata.html';
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
        element = angular.element('<file-metadata></file-metadata>');
        element = $compile(element)(scope);
        scope.$digest();
    }));

    it('should display the file name', function() {
        expect(jQuery('dt:eq(0)', element).text()).toBe('File');
        expect(jQuery('dd:eq(0)', element).text()).toBe(mockMetadata.filename);
    });

    it('should display the Reporting Year', function() {
        expect(jQuery('dt:eq(1)', element).text()).toBe('Reporting Year');
        expect(jQuery('dd:eq(1)', element).text()).toBe(mockMetadata.activityYear);
    });

    it('should display the Respondent ID', function() {
        expect(jQuery('dt:eq(2)', element).text()).toBe('Respondent ID');
        expect(jQuery('dd:eq(2)', element).text()).toBe(mockMetadata.respondentID);
    });

    it('should display the Total # of Loans', function() {
        expect(jQuery('dt:eq(3)', element).text()).toBe('Total Number of Loans/Applications');
        expect(jQuery('dd:eq(3)', element).text()).toBe(mockMetadata.totalLineEntries);
    });
});
