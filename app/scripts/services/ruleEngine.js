'use strict';

/**
 * @ngdoc service
 * @name hmdaPilotApp.service:RuleEngine
 * @description
 * # Rule Engine service
 * Service to interface with the HMDA Rule Engine
 */
module.exports = function () {

    // Get a list of the Fiscal Years in use by the HMDA Rule Engine
    this.getFiscalYears = function() {
        return ['2014', '2013'];
    };
};
