'use strict';

/**
 * Directive for displaying the pagination header
 *
 * @namespace hmdaPilotApp
 * @module {Directive} PaginationSize
 * @requires pagination
 *
 * @example
 * <pagination>
 *   <paginzation-size></pagination-size>
 * </pagination>
 */
module.exports = /*@ngInject*/ function() {

    return {
        restrict: 'E',
        require: '^pagination',
        templateUrl: 'partials/pagination-size.html'
    };
};
