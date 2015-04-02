'use strict';

function getFileSpecSection(scope, lineNumber) {
    var scopes = {
        'lar': 'loanApplicationRegister',
        'ts': 'transmittalSheet'
    };
    // Set proper scope for properties of hmda file elements
    if (scope === 'hmda') {
        scope = 'lar';
        if (lineNumber === '1') {
            scope = 'ts';
        }
    }
    return scopes[scope];
}

angular.module('hmdaFilters', [])
    .filter('hmdaLabel', ['HMDAEngine', 'FileMetadata', function(HMDAEngine, FileMetadata) {
        return function(input, scope) {
            var section = getFileSpecSection(scope, input.lineNumber);
            var fileSpec = HMDAEngine.getFileSpec(FileMetadata.get().activityYear);
            var property = fileSpec[section][input.property];
            if (property !== undefined && property.hasOwnProperty('label')) {
                return property.label;
            }
            return input.property;
        };
    }])
    .filter('hmdaValue', ['HMDAEngine', '$filter', function(HMDAEngine, $filter) {

        // Allow us to convert our string to a date
        String.prototype.toDate = function() {
            var year = parseInt(this.substr(0,4), 10),
                month = parseInt(this.substr(4,2), 10) - 1,
                day = parseInt(this.substr(6,2), 10);

            if (this.length === 8) {
                return new Date(year, month, day);
            } else {
                var hour = parseInt(this.substr(8,2), 10),
                    minute = parseInt(this.substr(10,2), 10);
                return new Date(year, month, day, hour, minute);
            }
        };

        return function(value, scope, property) {
            var section = getFileSpecSection(scope, value.lineNumber);
            var fileSpec = HMDAEngine.getFileSpec(HMDAEngine.getRuleYear());
            var propSpec = fileSpec[section][property];

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
            return value;
        };
    }])
    .filter('keyLength', function() {
        return function(input) {
            return Object.keys(input).length;
        };
    })
    .filter('capitalize', function() {
        return function (input) {
            return input.charAt(0).toUpperCase() + input.slice(1);
        };
    })
    .filter('agency', function() {
        return function (agencyCode) {
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
    .filter('entries', function() {
        return function(val) {
            if (val === 1) {
                return '(' + val + ' entry)';
            } else {
                return '(' + val + ' entries)';
            }
        };
    })
    .filter('paginate', function() {
        return function(input, start, end) {
            return input.slice(start-1, end);
        };
    });
