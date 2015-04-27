'use strict';

/**
 * Maintains the metadata associated with the HMDA data file. Used primarily by
 * the fileMetadata directive, but has other uses as well.
 *
 * @namespace hmdaPilotApp
 * @module {Service} FileMetadata
 */
module.exports = /*@ngInject*/ function(HMDAEngine) {

    var fileMetadata = {};

    /**
     * Get the metadata associated with the HMDA Data file
     *
     * @return {object} File metadata
     */
    this.get = function() {
        return fileMetadata;
    };

    /**
     * Store the HMDA Data file's filename for the metadata
     *
     * @param {string} filename
     */
    this.setFilename = function(str) {
        fileMetadata.filename = str;
    };

    /**
     * Reset the current file metadata
     *
     * @return {object} Empty file metadata
     */
    this.clear = function() {
        fileMetadata = {};
        return fileMetadata;
    };

    /**
     * Refresh the relevent metadata associated with the HMDA data file
     * Note: Most of the metadata is pulled in directly from the HMDA Rule Engine
     *
     * @return {object} file metadata
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
