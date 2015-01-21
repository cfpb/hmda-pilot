'use strict';

/**
 * @ngdoc service
 * @name hmdaPilotApp.service:FileMetadata
 * @description
 * # File Metadata service
 * Service to maintain relevent metadata associated with the HMDA data file
 */
module.exports = /*@ngInject*/ function (HMDAEngine) {

    var fileMetadata = {};

    /**
     * Relevent metadata associated with the HMDA Data file
     *
     * @type {Object}
     */
    this.fileMetadata = fileMetadata;

    /**
     * Store the HMDA Data file's filename for the metadata
     *
     * @param {String} filename
     */
    this.setFilename = function(str) {
        fileMetadata.filename = str;
    };

    /**
     * Reset the current file metadata
     *
     * @return {Object} file metadata
     */
    this.clear = function() {
        fileMetadata = {};
        return fileMetadata;
    };

    /**
     * Refresh the relevent metadata associated with the HMDA data file
     * Note: Most of the metadata is pulled in directly from the HMDA Rule Engine
     *
     * @return {Object} file metadata
     */
    this.refresh = function() {
        var hmdaFileObj;

        hmdaFileObj = HMDAEngine.getHmdaJson();

        if (Object.keys(hmdaFileObj).length !== 0) {
            var ts = hmdaFileObj.hmdaFile.transmittalSheet;

            fileMetadata.activityYear = ts.activityYear;
            fileMetadata.respondentID = ts.respondentID;
            fileMetadata.totalLineEntries = ts.totalLineEntries;

            return fileMetadata;
        } else {
            return {};
        }
    };
};
