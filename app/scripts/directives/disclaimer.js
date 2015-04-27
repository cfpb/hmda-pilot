'use strict';

/**
 * Displays a collapsible disclaimer.
 *
 * @namespace hmdaPilotApp
 * @module {Directive} Disclaimer
 */
module.exports = /*@ngInject*/ function() {

    var hideClass = 'u-visually-hidden';

    function controller($scope, $element) {
        $scope.toggle = function() {
            // Hide the content
            $element.toggleClass('collapsed');
            $element.find('p').toggleClass(hideClass);

            // Update the button
            if ($element.find('p').hasClass(hideClass)) {
                $element.find('button').text('more info ').append('<span class="cf-icon cf-icon-down"></span>');
            } else {
                $element.find('button').text('collapse ').append('<span class="cf-icon cf-icon-up"></span>');
            }
        };
    }

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'partials/disclaimer.html',
        controller: /*@ngInject*/ controller
    };
};
