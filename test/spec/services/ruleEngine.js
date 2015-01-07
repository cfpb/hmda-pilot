'use strict';

var RuleEngine = require('../../../app/scripts/services/ruleEngine');

describe('Service: RuleEngine', function () {

    var service;

    // Initialize the service
    beforeEach(function () {
        service = new RuleEngine();
    });

    describe('getFiscalYears', function() {
        it('should return a list of fiscal years sorted in ascending order', function () {
            var years = service.getFiscalYears();
            expect(years.length).toBe(2);
            expect(years[0]).toBe('2014');
            expect(years[1]).toBe('2013');
        });
    });
});
