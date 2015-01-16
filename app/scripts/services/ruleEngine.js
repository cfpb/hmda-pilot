'use strict';

/**
 * @ngdoc service
 * @name hmdaPilotApp.service:RuleEngine
 * @description
 * # Rule Engine service
 * Service to interface with the HMDA Rule Engine
 */
module.exports = function (HMDAEngine) {

    var filename;

    /**
     * Get a list of the Fiscal Years in use by the HMDA Rule Engine
     * TODO: Expose the get years method in the hmda-spec to the hmda-rule-engine
     *
     * @return {Array} fiscal years
     */
    this.getFiscalYears = function() {
        return ['2014', '2013'];
    };

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
