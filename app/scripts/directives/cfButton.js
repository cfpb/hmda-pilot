'use strict';

/**
 * @ngdoc directive
 * @name hmdaPilotApp.directive:cfButton
 * @description
 * # Capital Framework Button directive
 * Directive for displaying a button that use the Capital Framework
 */
module.exports = /*@ngInject*/ function () {

    var origBtnText;

    function disable($btn) {
        $btn.prop('disabled', true);
        $btn.addClass('btn__disabled');
        return $btn;
    }

    function enable($btn) {
        $btn.prop('disabled', false);
        $btn.removeClass('btn__disabled');
        return $btn;
    }

    function showProcessing($btn) {
        disable($btn);

        $btn.addClass('btn-processing');

        var text = $btn[0].getElementsByClassName('text')[0],
            icon = $btn[0].getElementsByClassName('cf-icon')[0],
            iconName = icon.className.match(/(^|\s)cf-icon-\S+/g)[0] || '';

        angular.element(icon)
            .removeClass(iconName)
            .addClass('cf-icon-update cf-spin');

        angular.element(text)
            .text('Processing...');

        return $btn;
    }

    function hideProcessing($btn, iconName, btnText) {
        enable($btn);

        $btn.removeClass('btn-processing');

        var text = $btn[0].getElementsByClassName('text')[0],
            icon = $btn[0].getElementsByClassName('cf-icon')[0];

        angular.element(icon)
            .removeClass('cf-icon-update')
            .removeClass('cf-spin')
            .addClass('cf-icon-' + iconName);

        angular.element(text)
            .text(btnText);

        return $btn;
    }

    function displayIcon($btn, name, position) {
        position = position || 'right'; // default to placing the icon on the right

        var icon = '<span class="btn_icon__' + position + '"><span class="cf-icon cf-icon-' + name + '"></span></span>';

        if (position === 'right') {
            $btn.append(icon);
        } else {
            $btn.prepend(icon);
        }
        return $btn;
    }

    function link(scope, element, attrs) {
        origBtnText = element.text();

        if (!attrs.ngClick) {
            element.attr('type', 'submit');
        }

        if (attrs.iconClass) {
            displayIcon(element, attrs.iconClass, attrs.iconPosition);
        }

        if (scope.processing) {
            showProcessing(element);
        }

        if (scope.isDisabled) {
            disable(element);
        }
    }

    function controller($scope, $element, $attrs) {
        if (!$scope.isDisabled) { // If the disabled state isn't being set 'manually'
            // Watch to see if the value of processing changes
            $scope.$watch('processing', function(newVal) {
                if (newVal) {
                    showProcessing($element);
                } else {
                    hideProcessing($element, $attrs.iconClass, origBtnText);
                }
            });
        }
    }

    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        template: '<button class="btn"><span class="text" ng-transclude>{{text}}</span></button>',
        scope: {
            processing: '=',
            isDisabled: '=',
            iconClass: '=',
            iconPosition: '='
        },
        link: link,
        controller: /*@ngInject*/ controller
    };
};
