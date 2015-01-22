'use strict';

require('angular');
require('angular-mocks');

describe('Controller: SummaryQualityMacroCtrl', function () {

    var scope,
        location;

    beforeEach(angular.mock.module('hmdaPilotApp'));

    beforeEach(inject(function ($rootScope, $location, $controller) {
        scope = $rootScope.$new();
        location = $location;

        $controller('SummaryQualityMacroCtrl', {
            $scope: scope,
            $location: location
        });
    }));

    describe('previous()', function() {
        // TODO: Stubbing out for now
    });

    describe('hasNext()', function() {
        // TODO: Stubbing out for now
    });

    describe('next()', function() {
        // TODO: Stubbing out for now
    });
});
