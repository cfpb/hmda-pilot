'use strict';

/**
 * Display metadata relevent to the current HMDA data file.
 *
 * @namespace hmdaPilotApp
 * @module {Directive} FileMetadata
 */
module.exports = /*@ngInject*/ function() {

    return {
        restrict: 'E',
        templateUrl: 'partials/fileMetadata.html',
        controller: /*@ngInject*/ function($scope, FileMetadata) {
            // Initialize $scope variables
            $scope.metadata = {};
            $scope.showMetadata = false;

            // Refresh the fileMetadata if it changes (usually only once on page load)
            $scope.$watch(function() {
                return FileMetadata.get();
            }, function() {
                angular.copy(FileMetadata.get(), $scope.metadata);

                // Check to see if some of the data from the parsed file is available since
                // this information may not be immediately available like the filename
                if (FileMetadata.get().activityYear) {
                    $scope.showMetadata = true;
                }
            }, true);
        }
    };
};
