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
    .filter('paginate', function() {
        return function(input, start, end) {
            return input.slice(start-1, end);
        };
    });
