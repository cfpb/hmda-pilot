'use strict';

/**
 * Display text descriptions of what each numeric code is
 *
 * @namespace hmdaPilotApp
 * @module {Directive} CodeDescriptions
 */
module.exports = /*@ngInject*/ function(HMDAEngine, ngDialog) {
    function getPropertyDescriptions() {
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

        return properties;
    }

    function link(scope, element) {
        element.bind('click', function() {
            ngDialog.open({
                template: 'partials/codeDescriptions.html',
                data: getPropertyDescriptions()
            });
        });
    }

    return {
        restrict: 'A',
        link: link
    };
};
