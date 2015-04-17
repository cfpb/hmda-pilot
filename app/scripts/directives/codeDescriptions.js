'use strict';

/**
 * @ngdoc directive
 * @name hmdaPilotApp.directive:codeDescriptions
 * @description
 * # Display text descriptions of what each numeric code is
 * Directive for displaying code descriptions
 */
module.exports = /*@ngInject*/ function() {
    return {
        restrict: 'E',
        templateUrl: 'partials/codeDescriptions.html',
        controller: /*ngInject*/ function($scope, HMDAEngine) {
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
            console.log(properties);
        }
    };
};
