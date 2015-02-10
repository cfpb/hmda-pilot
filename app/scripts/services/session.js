'use strict';

/**
 * @ngdoc service
 * @name hmdaPilotApp.service:Session
 * @description
 * # Session service
 * Service to maintain information about the current session
 */
module.exports = /*@ngInject*/ function () {

    var session = {
        verifiedQualityEdits: [],
        verifiedMacroEdits: {}
    };

    /**
     * Get the current session
     *
     * @return {Object} Session
     */
    this.getSession = function() {
        return session;
    };

    /**
     * Reset the current session to defaults
     *
     * @return {Object} session
     */
    this.reset = function() {
        session.verifiedQualityEdits = [];
        session.verifiedMacroEdits = {};
        return session;
    };

    /**
     * Is an editId verified or not
     *
     * @param {String} editId
     * @return {Boolean}
     */
    this.isVerified = function(editId) {
        if (session.verifiedQualityEdits.indexOf(editId) !== -1) {
            return true;
        } else if (session.verifiedMacroEdits[editId] !== undefined) {
            return true;
        } else {
            return false;
        }
    };

    /**
     * Get the list of verified Quality Edit IDs
     *
     * @return {Array} edit ids
     */
    this.getVerifiedQualityEditIds = function() {
        return session.verifiedQualityEdits;
    };

    /**
    * Get the list of verified Macro Edit IDs
     *
     * @return {Array} edit ids
     */
    this.getVerifiedMacroEditIds = function() {
        return Object.keys(session.verifiedMacroEdits);
    };

    /**
     * Get the verification reason for a specific Macro edit by Id
     *
     * @param {String} editId
     * @retrun {String} reason
     */
    this.getVerifiedReasonByEditId = function(editId) {
        return session.verifiedMacroEdits[editId];
    };

    /**
     * Add an editId to a list of verified Quality edits
     *
     * @param {String} editId to be added
     * @return {Array} verified quality edits
     */
    this.addToVerifiedQualityEdits = function (editId) {
        session.verifiedQualityEdits.push(editId);
        return session.verifiedQualityEdits;
    };

    /**
     * Add an editId to a list of verified Macro edits
     *
     * @param {String} editId
     * @param {String} reason
     * @return {Array} verified items
     */
    this.addToVerifiedMacroEdits = function (editId, reason) {
        session.verifiedMacroEdits[editId] = reason;
        return session.verifiedMacroEdits;
    };
};
