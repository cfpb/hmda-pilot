'use strict';

var SummaryMSAIRSCtrl = require('../../../app/scripts/controllers/summaryMSA-IRS');

describe('Controller: SummaryMSAIRSCtrl', function () {

    var ctrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(function () {
        scope = {};
        ctrl = new SummaryMSAIRSCtrl(scope);
    });

    it('should attach a list of awesomeThings to the scope', function () {
        expect(scope.awesomeThings.length).toBe(3);
    });
});
