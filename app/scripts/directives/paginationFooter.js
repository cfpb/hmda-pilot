'use strict';

/**
 * @ngdoc directive
 * @name hmdaPilotApp.directive:PaginationFooter
 * @description
 * # Pagination Footer directive
 * Directive for displaying the pagination footer
 */
module.exports = /*@ngInject*/ function () {

    return {
        restrict: 'E',
        require: '^pagination',
        templateUrl: 'partials/pagination-footer.html'
    };
};
