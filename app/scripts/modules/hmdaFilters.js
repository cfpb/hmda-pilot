'use strict';

angular.module('hmdaFilters', [])
    .filter('hmdaLabel', ['HMDAEngine', 'FileMetadata', function(HMDAEngine, FileMetadata) {
        return function(input, scope) {
            var scopes = {
                'lar': 'loanApplicationRegister',
                'ts': 'transmittalSheet'
            };
            var fileSpec = HMDAEngine.getFileSpec(FileMetadata.get().activityYear);
            return fileSpec[scopes[scope]][input].label;
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
    });
