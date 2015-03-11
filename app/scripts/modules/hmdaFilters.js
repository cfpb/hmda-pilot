'use strict';

angular.module('hmdaFilters', [])
    .filter('hmdaLabel', ['HMDAEngine', 'FileMetadata', function(HMDAEngine, FileMetadata) {
        return function(input, scope) {
            var scopes = {
                'lar': 'loanApplicationRegister',
                'ts': 'transmittalSheet'
            };
            // Set proper scope for properties of hmda file elements
            if (scope === 'hmda') {
                scope = 'lar';
                if (input.lineNumber === '1') {
                    scope = 'ts';
                }
            }
            var fileSpec = HMDAEngine.getFileSpec(FileMetadata.get().activityYear);
            var property = fileSpec[scopes[scope]][input.property];
            if (property !== undefined && property.hasOwnProperty('label')) {
                return property.label;
            }
            return input.property;
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
