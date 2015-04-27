'use strict';

/**
 * Wrapper directive for the paginationNav and paginationSize directives.
 *
 * @namespace hmdaPilotApp
 * @module {Directive} Pagination
 */
module.exports = /*@ngInject*/ function() {

    return {
        restrict: 'E',
        template: '<div ng-transclude></div>',
        transclude: true,
        controller: 'PaginationCtrl'
    };
};
