'use strict';

require('angular');
require('angular-mocks');

describe('Controller: ValidationSummaryCtrl', function() {

    var scope,
        location,
        mockNgDialog,
        HMDAEngine,
        mockEngine = {
            getHmdaJson: function() { return {hmdaFile: { transmittalSheet: {}}}; },
            destroyDB: function() { return; }
        };

    beforeEach(angular.mock.module('hmdaPilotApp'));

    beforeEach(inject(function($rootScope, $q, $location, $controller, _FileMetadata_, _Configuration_) {
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

        HMDAEngine = mockEngine;
        spyOn(HMDAEngine, 'destroyDB');

        $controller('ValidationSummaryCtrl', {
            $scope: scope,
            $location: location,
            FileMetadata: _FileMetadata_,
            HMDAEngine: mockEngine,
            ngDialog: mockNgDialog,
            Configuration: _Configuration_
        });
    }));

    beforeEach(inject(function($templateCache) {
        var templateUrl = 'partials/confirmSessionReset.html';
        var asynchronous = false;

        var req = new XMLHttpRequest();
        req.onload = function() {
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

        it('should call destroyDB', function() {
            expect(HMDAEngine.destroyDB).toHaveBeenCalled();
        });

    });

    describe('previous()', function() {
        it('should direct the user to the /summaryMSA-IRS page', function() {
            scope.previous();
            scope.$digest();
            expect(location.path()).toBe('/summaryMSA-IRS');
        });
    });

    describe('startOver()', function() {
        describe('when config.confirmSessionReset is true', function() {
            it('should display the confirmation dialog', function() {
                scope.startOver();
                expect(mockNgDialog.openConfirm).not.toHaveBeenCalled();
                expect(location.path()).toBe('/selectFile');
            });
        });

        describe('when config.confirmSessionReset is false', function() {
            it('should take the user to the home page', function() {
                scope.startOver();
                expect(mockNgDialog.openConfirm).not.toHaveBeenCalled();
                expect(location.path()).toBe('/selectFile');
            });
        });
    });
});
