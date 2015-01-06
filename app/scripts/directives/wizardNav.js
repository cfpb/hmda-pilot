'use strict';

/**
 * @ngdoc directive
 * @name hmdaPilotApp.direcive:WizardNav
 * @description
 * # Wizard Nav directive
 * Directive for displaying the wizard navigation.
 */
module.exports = function (Wizard) {

    function modifyStepsForDisplay (steps) {
        for (var i=0; i < steps.length; i++) {
            steps[i].stepClass = steps[i].status;

            if (steps[i].isComplete()) {
                steps[i].stepClass += ' focusable';
                steps[i].iconClass = 'icon cf-icon cf-icon-approved';
                steps[i].iconText = '';
            } else {
                steps[i].iconClass = 'icon icon-num';
                steps[i].iconText = i + 1;
            }
        }
        return steps;
    }

    return {
        restrict: 'E',
        link: function(scope) {
            scope.$on('$routeChangeSuccess', function (event, current, previous) {
                if (current !== previous) {
                    var steps = Wizard.getSteps();
                    scope.steps = modifyStepsForDisplay(steps);
                }
            });
        },
        templateUrl: 'partials/wizardNav.html'
    };
};
