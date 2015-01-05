'use strict';

/**
 * @ngdoc directive
 * @name hmdaPilotApp.direcive:WizardNav
 * @description
 * # Wizard Nav directive
 * Directive for displaying the wizard navigation.
 */
module.exports = function (Wizard) {

    return {
        restrict: 'E',
        link: function(scope) {
            scope.$on('$routeChangeSuccess', function (event, current, previous) {
                if (current !== previous) {
                    scope.steps = Wizard.getSteps();
                }
            });
        },
        templateUrl: 'partials/wizardNav.html'
    };
};
