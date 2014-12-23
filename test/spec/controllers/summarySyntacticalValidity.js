'use strict';

var SummarySyntacticalValidityCtrl = require('../../../app/scripts/controllers/summarySyntacticalValidity');

describe('Controller: SummarySyntacticalValidityCtrl', function () {

    var ctrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(function () {
        scope = {};
        ctrl = new SummarySyntacticalValidityCtrl(scope);
    });

    it('should attach a list of awesomeThings to the scope', function () {
        expect(scope.awesomeThings.length).toBe(3);
    });
});
