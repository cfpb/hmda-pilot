'use strict';

var SelectFileCtrl = require('../../../app/scripts/controllers/selectFile');
var RuleEngine = require('../../../app/scripts/services/ruleEngine');

describe('Controller: SelectFileCtrl', function () {

    var ctrl,
        ruleEngine,
        scope;

    // Initialize the controller
    beforeEach(function () {
        scope = {};
        ruleEngine = new RuleEngine();
        ctrl = new SelectFileCtrl(scope, ruleEngine);
    });

    describe('Initial state', function () {
        it('should include a list of reporting years', function () {
            expect(scope.reportingYears.length).toBe(2);
        });

        it('should default the HMDA filing year to current reporting year - 1', function() {
            expect(scope.reportingYears[0]).toBe('2014');
            expect(scope.hmdaData.year).toBe('2013');
        });
    });

    describe('Form Submission', function() {
        // Nothing really to test yet...
    });
});
