'use strict';

require('angular');
require('angular-mocks');

describe('Controller: ProgressBarCtrl', function () {

    var scope,
        mockEngine = {
            getProgress: function() {
                return { events: { on: function() {} } };
            }
        };

    beforeEach(angular.mock.module('hmdaPilotApp'));

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();

        // spyOn(mockEngine.getProgress().events, 'on').and.returnValue(100);

        $controller('ProgressBarCtrl', {
            $scope: scope,
            HMDAEngine: mockEngine
        });
    }));

    describe('initial scope', function() {
        it('should set the percentageComplete to 0', function() {
            expect(scope.percentageComplete).toBe(0);
        });
    });
});
