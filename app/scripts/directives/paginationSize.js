'use strict';

/**
 * @ngdoc directive
 * @name hmdaPilotApp.directive:PaginationHeader
 * @description
 * # Pagination Header directive
 * Directive for displaying the pagination header
 */
module.exports = /*@ngInject*/ function () {

    return {
        restrict: 'E',
        require: '^pagination',
        templateUrl: 'partials/pagination-size.html'
    };
};
