'use strict';

/**
 * @ngdoc directive
 * @name hmdaPilotApp.direcive:FileMetadata
 * @description
 * # File Metadata directive
 * Directive for displaying metadata relevent to the current HMDA data file
 */
module.exports = /*@ngInject*/ function (RuleEngine) {

    return {
        restrict: 'E',
        templateUrl: 'partials/fileMetadata.html',
        link: function(scope){
            scope.metadata = RuleEngine.getFileMetadata();
            scope.showMetadata = angular.equals(scope.metadata, {}) ? false : true;
        }
    };
};
