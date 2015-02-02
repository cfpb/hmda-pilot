'use strict';

/**
 * @ngdoc directive
 * @name hmdaPilotApp.directive:FileSelector
 * @description
 * # File Selector directive
 * Directive for selecting the HMDA Data file
 */
module.exports = /*@ngInject*/ function () {

    return {
        link: function(scope, element){
            element.bind('change', function(evt) {
                scope.file = (evt.srcElement || evt.target).files[0];
                scope.getFile();
            });
        }
    };
};
