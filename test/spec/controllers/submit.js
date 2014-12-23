'use strict';

var SubmitCtrl = require('../../../app/scripts/controllers/submit');

describe('Controller: SubmitCtrl', function () {

    var ctrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(function () {
        scope = {};
        ctrl = new SubmitCtrl(scope);
    });

    it('should attach a list of awesomeThings to the scope', function () {
        expect(scope.awesomeThings.length).toBe(3);
    });
});
