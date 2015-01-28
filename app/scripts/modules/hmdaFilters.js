'use strict';

angular.module('hmdaFilters', [])
    .filter('keyLength', function() {
        return function(input) {
            return Object.keys(input).length;
        };
    });
