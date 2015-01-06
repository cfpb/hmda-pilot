'use strict';

var SummaryQualityMacroCtrl = require('../../../app/scripts/controllers/summaryQualityMacro');

describe('Controller: SummaryQualityMacroCtrl', function () {

    var ctrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(function () {
        scope = {};
        ctrl = new SummaryQualityMacroCtrl(scope);
    });

    it('should attach a list of awesomeThings to the scope', function () {
        expect(scope.awesomeThings.length).toBe(3);
    });
});
