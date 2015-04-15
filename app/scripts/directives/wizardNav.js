'use strict';

/**
 * @ngdoc directive
 * @name hmdaPilotApp.directive:WizardNav
 * @description
 * # Wizard Nav directive
 * Directive for displaying the wizard navigation.
 */
module.exports = /*@ngInject*/ function ($location, $timeout, StepFactory, Wizard, ngDialog) {

    function getStepClass(step) {
        console.log(step);
        if (step.isActive) {
            step.stepClass = 'active';
        } else {
            step.stepClass = step.status;
        }

        if (step.isComplete() || step.isActive) {
            step.stepClass += ' focusable';
        }

        if (step.isFocused && !step.isActive) {
            step.stepClass += ' is_focused';
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

    function controller($scope, Configuration) {
        if (Configuration.confirmSessionReset) {
            $scope.$on('$locationChangeStart', function(event, newUrl) {
                if (newUrl.indexOf('#/selectFile') !== -1 ) {
                    ngDialog.openConfirm({
                        template: 'partials/confirmSessionReset.html'
                    }).then(function (value) {
                        if (value === 'reset') {
                            $location.path('/');
                        }
    			});
                    event.preventDefault();
                }

                return;
            });
        }
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

            // Determine if the wizard nav should be displayed or not
            scope.showWizardNav = function() {
                return ['/about', '/common-questions'].indexOf($location.path()) === -1;
            };

            scope.setActive = function(step) {
                console.log('setActive');
                var newSteps = Wizard.getSteps();

                for (var i=0; i < newSteps.length; i++) {
                    if (newSteps[i] === step) {
                        console.log('equals');
                        newSteps[i].isFocused = true;
                    } else {
                        newSteps[i].isFocused = false;
                    }
                    newSteps[i] = getStepClass(newSteps[i]);
                }
                $location.path(step.view);
            };

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
