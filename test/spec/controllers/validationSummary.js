'use strict';

require('angular');
require('angular-mocks');

describe('Controller: ValidationSummaryCtrl', function () {

    var scope,
        location,
        mockEngine = {
            getHmdaJson: function() { return {hmdaFile: { transmittalSheet: {}}}; }
        };

    beforeEach(angular.mock.module('hmdaPilotApp'));

    beforeEach(inject(function ($rootScope, $location, $controller, _FileMetadata_) {
        scope = $rootScope.$new();
        location = $location;
        var FileMetadata = _FileMetadata_;
        FileMetadata.setFilename('test.foo');

        $controller('ValidationSummaryCtrl', {
            $scope: scope,
            $location: location,
            FileMetadata: _FileMetadata_,
            HMDAEngine: mockEngine
        });
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
        it('should direct the user to the /selectFile page', function () {
            scope.startOver();
            scope.$digest();
            expect(location.path()).toBe('/selectFile');
        });
    });
});
