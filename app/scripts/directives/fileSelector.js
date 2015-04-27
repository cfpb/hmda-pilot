'use strict';

/**
 * Select the HMDA Data file
 *
 * @namespace hmdaPilotApp
 * @module {Directive} FileSelector
 */
module.exports = /*@ngInject*/ function() {

    return {
        link: function(scope, element) {
            element.bind('change', function(evt) {
                scope.file = (evt.srcElement || evt.target).files[0];
                scope.getFile();
            });
        }
    };
};
