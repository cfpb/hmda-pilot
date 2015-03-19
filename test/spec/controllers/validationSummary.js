'use strict';

require('angular');
require('angular-mocks');

describe('Controller: ValidationSummaryCtrl', function () {

    var scope,
        location,
        mockNgDialog,
        mockEngine = {
            getHmdaJson: function() { return {hmdaFile: { transmittalSheet: {}}}; }
        };

    beforeEach(angular.mock.module('hmdaPilotApp'));

    beforeEach(inject(function ($rootScope, $q, $location, $controller, _FileMetadata_) {
        scope = $rootScope.$new();
        location = $location;
        var FileMetadata = _FileMetadata_;
        FileMetadata.setFilename('test.foo');

        var mockNgDialogPromise = {
            then: function(callback) {
                callback('reset');
            }
        };
        mockNgDialog = {
            openConfirm: function() { }
        };
        spyOn(mockNgDialog, 'openConfirm').and.returnValue(mockNgDialogPromise);

        $controller('ValidationSummaryCtrl', {
            $scope: scope,
            $location: location,
            FileMetadata: _FileMetadata_,
            HMDAEngine: mockEngine,
            ngDialog: mockNgDialog
        });
    }));

    beforeEach(inject(function ($templateCache) {
        var templateUrl = 'partials/confirmSessionReset.html';
        var asynchronous = false;

        var req = new XMLHttpRequest();
        req.onload = function () {
            $templateCache.put(templateUrl, this.responseText);
        };
        req.open('get', '/base/app/' + templateUrl, asynchronous);
        req.send();
    }));

    describe('initial scope', function() {
        it('should include the file metadata', function() {
            expect(scope.fileMetadata).toBeDefined();
        });

        it('should include the file transmittalSheet', function() {
            expect(scope.transmittalSheet).toBeDefined();
        });
    });

    describe('previous()', function() {
        it('should direct the user to the /summaryMSA-IRS page', function () {
            scope.previous();
            scope.$digest();
            expect(location.path()).toBe('/summaryMSA-IRS');
        });
    });

    describe('startOver()', function() {
        it('should display the confirmation dialog', function () {
            scope.startOver();
            expect(mockNgDialog.openConfirm).toHaveBeenCalled();
            expect(location.path()).toBe('/selectFile');
        });
    });
});
