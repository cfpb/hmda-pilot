'use strict';

/**
 * Directive for displaying the pagination navigation. Provides Previous, Next
 * and per-page navigation.
 *
 * @namespace hmdaPilotApp.directives
 * @module {Directive} PaginationNav
 * @requires {@link pagination}
 *
 * @example
 * <pagination>
 *   <paginzation-nav></pagination-nav>
 * </pagination>
 */
module.exports = /*@ngInject*/ function() {

    return {
        restrict: 'E',
        require: '^pagination',
        templateUrl: 'partials/pagination-nav.html'
    };
};
