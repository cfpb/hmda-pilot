'use strict';

/**
 * Display text descriptions of what each numeric code is
 *
 * @namespace hmdaPilotApp
 * @module {Directive} CodeDescriptions
 */
module.exports = /*@ngInject*/ function() {
    return {
        restrict: 'E',
        template: '<button class="btn btn__link code-descriptions" ng-click="open()" title="Show List of HMDA Edit Values">HMDA Edit Values</button>',
        controller: /*ngInject*/ function($scope, HMDAEngine, ngDialog) {
            $scope.open = function() {
                var properties = {};

                var fileSpec = HMDAEngine.getFileSpec(HMDAEngine.getRuleYear());
                angular.forEach(['transmittalSheet', 'loanApplicationRegister'], function(val) {
                    for (var prop in fileSpec[val]) {
                        var property = fileSpec[val][prop];
                        if (property.validation && property.validation.type === 'number' && property.validation.values) {
                            properties[property.label] = property.validation.values;
                        }
                    }
                });

                ngDialog.open({
                    template: 'partials/codeDescriptions.html',
                    data: properties
                });
            };
        }
    };
};
