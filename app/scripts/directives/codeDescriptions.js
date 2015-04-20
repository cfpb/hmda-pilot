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
        template: '<span class="pointer" ng-click="open()">Show List of HMDA Edit Values</span>',
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
