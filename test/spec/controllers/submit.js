'use strict';

require('angular');
require('angular-mocks');

describe('Controller: SubmitCtrl', function () {

    var scope,
        location;

    beforeEach(angular.mock.module('hmdaPilotApp'));

    beforeEach(inject(function ($rootScope, $location, $controller) {
        scope = $rootScope.$new();
        location = $location;

        $controller('SubmitCtrl', {
            $scope: scope,
            $location: location
        });
    }));

    describe('previous()', function() {
        // TODO: Stubbing out for now
    });

    describe('canSubmit()', function() {
        // TODO: Stubbing out for now
    });

    describe('submit()', function() {
        // TODO: Stubbing out for now
    });
});
