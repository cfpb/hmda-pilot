'use strict';

/**
 * @ngdoc service
 * @name hmdaPilotApp.service:RuleEngine
 * @description
 * # Rule Engine service
 * Service to interface with the HMDA Rule Engine
 */
module.exports = /*@ngInject*/ function (HMDAEngine) {

    var filename;

    /**
     * Store the HMDA Data file's filename for the metadata
     *
     * @param {String} filename
     */
    this.setFilename = function(str) {
        filename = str;
    };

    /**
     * Get the relevent metadata associated with the HMDA Data file
     *
     * @return {Object} file metadata
     */
    this.getFileMetadata = function() {
        var hmdaFileObj;

        hmdaFileObj = HMDAEngine.getHmdaJson();

        if (Object.keys(hmdaFileObj).length !== 0) {
            var ts = hmdaFileObj.hmdaFile.transmittalSheet;

            return {
                filename: filename,
                activityYear: ts.activityYear,
                respondentID: ts.respondentID,
                totalLineEntries: ts.totalLineEntries
            };
        } else {
            return {};
        }
    };
};
