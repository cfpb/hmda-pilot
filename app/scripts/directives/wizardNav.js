'use strict';

/**
 * @ngdoc directive
 * @name hmdaPilotApp.directive:WizardNav
 * @description
 * # Wizard Nav directive
 * Directive for displaying the wizard navigation.
 */
module.exports = /*@ngInject*/ function ($location, StepFactory, Wizard, ngDialog) {

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

    function controller($scope) {
        $scope.$on('$locationChangeStart', function(event, newUrl) {
            if (newUrl.indexOf('#/selectFile') !== -1 ) {
                ngDialog.openConfirm({
                    template: 'partials/confirmSessionReset.html'
                }).then(function (value) {
                    if (value === 'reset') {
                        $location.path(newUrl);
                    }
			});
                event.preventDefault();
            }

            return;
        });
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
        },
        controller: /*@ngInject*/ controller
    };
};
