'use strict';

function getFileSpecSection(scope, lineNumber, property) {
    var scopes = {
        lar: 'loanApplicationRegister',
        ts: 'transmittalSheet'
    };

    // Set proper scope for properties of hmda file elements
    if (scope === 'hmda') {
        scope = 'lar';
        if (lineNumber === '1') {
            scope = 'ts';
        }

        // Allow referencing TS properties for lineNumbers != 1 (LARs)
        // using dot notation
        if (property && property.indexOf('transmittalSheet') !== -1) {
            scope = 'ts';
            property = property.replace(/transmittalSheet\./i, '');
        }
    }
    return {
        scope: scopes[scope],
        property: property
    };
}

/**
 * @module hmdaFilters
 */
angular.module('hmdaFilters', [])

    /**
     * Transforms the key used for a HMDA label into a human-readable string by
     * looking up the label valie in the HMDA File Spec.
     *
     * @param  {string}  input    HMDA file spec key
     * @param  {string}  scope    Location within the HMDA file spec where the
     *                            label can be found; loanApplicationRegister or
     *                            transmittalSheet
     * @return {string}           Human-readable label
     */
    .filter('hmdaLabel', ['HMDAEngine', function(HMDAEngine) {
        return function(input, scope) {
            var scopeAndProp = getFileSpecSection(scope, input.lineNumber, input.property);
            var fileSpec = HMDAEngine.getFileSpec(HMDAEngine.getRuleYear());
            var property = fileSpec[scopeAndProp.scope][scopeAndProp.property];
            if (property !== undefined && property.hasOwnProperty('label')) {
                return property.label;
            }
            return input.property;
        };
    }])

    /**
     * Formats the input value based on the validation type property defined in
     * the HMDA file spec.
     *
     * @param  {string}  value    Property value returned by the Edit Errors
     *                            object
     * @param  {string}  scope    Location within the HMDA file spec where the
     *                            label can be found; loanApplicationRegister or
     *                            transmittalSheet
     * @param  {string}  property The HMDA file spec property associated with
     *                            the input value
     * @return {string}           Input is formatted as either a percent, date,
     *                            datetime or currency value
     */
    .filter('hmdaValue', ['HMDAEngine', '$filter', function(HMDAEngine, $filter) {

        // Allow us to convert our string to a date
        String.prototype.toDate = function() {
            var year = parseInt(this.substr(0, 4), 10),
                month = parseInt(this.substr(4, 2), 10) - 1,
                day = parseInt(this.substr(6, 2), 10);

            if (this.length === 8) {
                return new Date(year, month, day);
            } else {
                var hour = parseInt(this.substr(8, 2), 10),
                    minute = parseInt(this.substr(10, 2), 10);
                return new Date(year, month, day, hour, minute);
            }
        };

        return function(value, scope, property) {
            if (value !== 'NA') {
                var scopeAndProp = getFileSpecSection(scope, value.lineNumber, property);
                var fileSpec = HMDAEngine.getFileSpec(HMDAEngine.getRuleYear());
                var propSpec = fileSpec[scopeAndProp.scope][scopeAndProp.property];

                if (propSpec !== undefined && propSpec.hasOwnProperty('validation')) {
                    var propVal = propSpec.validation;
                    var result;

                    if (propVal.type === 'percent') {
                        return value + '%';
                    } else if (propVal.type === 'date' && propVal.match === 'yyyyMMdd') {
                        return $filter('date')(value.toDate(), 'M/d/yyyy');
                    } else if (propVal.type === 'date' && propVal.match === 'yyyyMMddHHmm') {
                        return $filter('date')(value.toDate(), 'M/d/yyyy H:mm');
                    } else if (propVal.type === 'currency') {
                        result = parseInt(value) * parseInt(propVal.multiplier);
                        return $filter('currency')(result, '$', 0);
                    }
                }
            }
            return value;
        };
    }])

    /**
     * Formats the input value from a HMDA Macro Quality edit by using a portion
     * the key to determine how the value should be formatted.
     *
     * * Values that start with '% of' are formatted a percents
     * * Values that start with '% Difference' are formatted a percents
     * * Values that end with 'Percentage' are formatted a percents
     * * Values that start with 'Total Dollar' are formatted a currency
     *
     * @param  {string}  value    Property value returned by the Edit Errors object
     * @param  {string}  key      Label used to describe the submitted value
     * @return {string}           Input is formatted as either a percent or currency value
     */
    .filter('hmdaMacroValue', ['HMDAEngine', '$filter', function(HMDAEngine, $filter) {
        return function(value, key) {
            // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
            if (HMDAEngine.starts_with(key, '% of') || HMDAEngine.starts_with(key, '% Difference') || HMDAEngine.ends_with(key, 'Percentage')) {
                return value + '%';
            } else if (HMDAEngine.starts_with(key, 'Total Dollar')) {
                return $filter('currency')(value, '$', 0);
            }

            return value;
        };
    }])

    /**
     * Returns the number of items in an object. Typically used as part of the
     * pagination of edit errors.
     *
     * @param  {object}  input  An object
     * @return {Integer}        Number of keys in the object
     */
    .filter('keyLength', function() {
        return function(input) {
            return Object.keys(input).length;
        };
    })

    /**
     * Capitalizes the first character of a string.
     *
     * @param {string} input    A lowercase string
     * @return {string}         A capitalized string
     */
    .filter('capitalize', function() {
        return function(input) {
            return input.charAt(0).toUpperCase() + input.slice(1);
        };
    })

    /**
     * Provides a lookup of the agency abbreviation given a valid agency code.
     *
     * @param {Number} agencyCode  An agency code
     * @return {string}            Agency abbreviation or empty string if not found.
     */
    .filter('agency', function() {
        return function(agencyCode) {
            var codes = {
                1: 'OCC',
                2: 'FRS',
                3: 'FDIC',
                5: 'NCUA',
                7: 'HUD',
                9: 'CFPB'
            };
            return codes[agencyCode] || '';
        };
    })

    /**
     * Pluralizes the number of entries if more than 1.
     *
     * @param {Number} value    Total number of entries
     * @return {string}         Formatted number of entries
     */
    .filter('entries', function() {
        return function(val) {
            if (val === 1) {
                return '(' + val + ' entry)';
            } else {
                return '(' + val + ' entries)';
            }
        };
    })

    /**
     * Create a subset of items in a array based on a defined start and end index.
     *
     * @param {Array}  input    An array of items to paginate
     * @param {Number} start    The index of the first item to include in the list
     * @param {Number} end      The index of the last item to include in the list
     * @return {Array}          A subset of the original list
     */
    .filter('paginate', function() {
        return function(input, start, end) {
            return input.slice(start - 1, end);
        };
    });
