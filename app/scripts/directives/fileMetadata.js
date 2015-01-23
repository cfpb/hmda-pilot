'use strict';

/**
 * @ngdoc directive
 * @name hmdaPilotApp.directive:FileMetadata
 * @description
 * # File Metadata directive
 * Directive for displaying metadata relevent to the current HMDA data file
 */
module.exports = /*@ngInject*/ function () {

    return {
        restrict: 'E',
        templateUrl: 'partials/fileMetadata.html',
        controller: function($scope, FileMetadata) {
            // Initialize $scope variables
            $scope.metadata = {};
            $scope.showMetadata = false;

            // Refresh the fileMetadata if it changes (usually only once on page load)
            $scope.$watch(function() {
                return FileMetadata.fileMetadata;
            }, function() {
                angular.copy(FileMetadata.fileMetadata, $scope.metadata);

                // Check to see if some of the data from the parsed file is available since
                // this information may not be immediately available like the filename
                if (FileMetadata.fileMetadata.activityYear) {
                    $scope.showMetadata = true;
                }
            }, true);
        }
    };
};
