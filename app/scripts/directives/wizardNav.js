'use strict';

/**
 * Directive for displaying the wizard navigation.
 *
 * @namespace hmdaPilotApp
 * @module {Directive} WizardNav
 */
module.exports = /*@ngInject*/ function($location, $timeout, StepFactory, Wizard, ngDialog) {

    function getStepClass(step) {
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
                if (newUrl.indexOf('/selectFile') !== -1) {
                    ngDialog.openConfirm({
                        template: 'partials/confirmSessionReset.html'
                    }).then(function(value) {
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
        link: function(scope, element) {
            // Initialize scope variables
            scope.steps = [];

            // Determine if the wizard nav should be displayed or not
            scope.showWizardNav = function() {
                return ['/about', '/common-questions'].indexOf($location.path()) === -1;
            };

            scope.currentStepIdx = Wizard.getCurrentStepIdx();

            // Watch the Wizard steps to see if they change
            scope.$watch(function() {
                return Wizard.getCurrentStep();
            }, function() {
                var newSteps = Wizard.getSteps();

                for (var i = 0; i < newSteps.length; i++) {
                    newSteps[i] = getStepClass(newSteps[i]);
                    newSteps[i] = getStepBadge(newSteps[i], i);
                }

                scope.steps = newSteps;

                $timeout(function() { // Wrap the events in a timeout to give the partial time to render :(
                    element.find('a').on('focus', function(event) {
                        angular.element(event.target).parent().addClass('is_focused');
                    });

                    element.find('a').on('blur', function(event) {
                        angular.element(event.target).parent().removeClass('is_focused');
                    });
                }, 100);
            });

            scope.$on('$routeChangeSuccess', function(event, current, previous) {
                if (current !== previous) {
                    scope.steps = Wizard.getSteps();
                }
            });
            scope.$on('$locationChangeSuccess', function(event, newUrl) {
                var newSteps = Wizard.getSteps();

                for (var i = 0; i < newSteps.length; i++) {
                    if (newUrl.indexOf('/' + newSteps[i].view) !== -1) {
                        newSteps[i].isFocused = true;
                    } else {
                        newSteps[i].isFocused = false;
                    }
                    newSteps[i] = getStepClass(newSteps[i]);
                }
            });

        },
        controller: /*@ngInject*/ controller
    };
};
