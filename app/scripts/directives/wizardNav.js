'use strict';

/**
 * @ngdoc directive
 * @name hmdaPilotApp.direcive:WizardNav
 * @description
 * # Wizard Nav directive
 * Directive for displaying the wizard navigation.
 */
module.exports = /*@ngInject*/ function (StepFactory, Wizard) {

    function getStepClass(step) {
        if (step.isActive) {
            step.stepClass = 'active';
        } else {
            step.stepClass = step.status;
        }

        if (step.isComplete()) {
            step.stepClass += ' focusable';
        }

        return step;
    }

    function getStepBadge(step, stepIdx) {
        if (step.isComplete()) {
            step.badgeClass = 'step-badge cf-icon cf-icon-approved';
            step.badgeText = '';
        } else {
            step.badgeClass = 'step-badge badge-num';
            step.badgeText = stepIdx + 1;
        }

        return step;
    }

    return {
        restrict: 'E',
        templateUrl: 'partials/wizardNav.html',
        scope: {
            steps: '='
        },
        link: function(scope) {
            // Initialize scope variables
            scope.steps = [];

            // Watch the Wizard steps to see if they change
            scope.$watch(function() {
                return Wizard.getCurrentStep();
            }, function() {
                var newSteps = Wizard.getSteps();

                for (var i=0; i < newSteps.length; i++) {
                    newSteps[i] = getStepClass(newSteps[i]);
                    newSteps[i] = getStepBadge(newSteps[i], i);
                }

                scope.steps = newSteps;
            });

            scope.$on('$routeChangeSuccess', function (event, current, previous) {
                if (current !== previous) {
                    scope.steps = Wizard.getSteps();
                }
            });
        }
    };
};
