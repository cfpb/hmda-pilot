'use strict';

require('angular');
require('angular-mocks');

describe('Controller: ProgressBarCtrl', function() {

    var scope,
        location,
        mockEngine = {
            getProgress: function() {
                return { events: { on: function() {} } };
            },
            getFileProgress: function() {
                return { events: { on: function() {} } };
            }
        };

    beforeEach(angular.mock.module('hmdaPilotApp'));

    beforeEach(inject(function($rootScope, $window, $controller) {
        scope = $rootScope.$new();
        scope.closeThisDialog = function() { return; };
        location = $window.location;
        location.reload = function() { return; };

        spyOn(scope, 'closeThisDialog');
        spyOn(location, 'reload');

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

    describe('cancel()', function() {
        it('should close the dialog', function() {
            scope.cancel();
            expect(scope.closeThisDialog).toHaveBeenCalled();
        });

        it('should trigger a reload', function() {
            scope.cancel();
            expect(location.reload).toHaveBeenCalled();
        });
    });

});
