'use strict';

require('angular-mocks');

describe('Filters: hmdaFilters', function() {

    beforeEach(angular.mock.module('hmdaFilters'));

    describe('keyLength', function() {
        it('should return the length of the input object\'s keys', angular.mock.inject(function(keyLengthFilter) {
            expect(keyLengthFilter({})).toBe(0);
            expect(keyLengthFilter({'foo': true})).toBe(1);
        }));
    });
});
