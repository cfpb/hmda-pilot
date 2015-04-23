'use strict';

require('angular');
require('angular-mocks');

describe('Directive: FileSelector', function() {

    beforeEach(angular.mock.module('hmdaPilotApp'));

    var element,
        scope;

    beforeEach(inject(function($rootScope, $compile) {
        scope = $rootScope.$new();
        scope.getFile = function() {
            return {};
        };
        spyOn(scope, 'getFile');
        element = angular.element('<input type="file" ng-file-select="onFileSelect($files)" />');
        element = $compile(element)(scope);
        scope.$digest();
    }));

    it('call getFile on file selection', function() {
        element.triggerHandler('change');
        expect(scope.getFile).toHaveBeenCalled();
    });
});
