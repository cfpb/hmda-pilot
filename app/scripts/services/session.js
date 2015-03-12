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
        verifiedMacroEdits: {},
        verifiedSpecialEdits: {},
        verifiedIRSReport: false
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
        session.verifiedSpecialEdits = {};
        session.verifiedIRSReport = false;
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
        } else if (session.verifiedSpecialEdits[editId] !== undefined) {
            return true;
        } else if (editId === 'IRS') {
            return this.hasVerifiedIRSReport();
        } else {
            return false;
        }
    };

    // ## Quality Edits

    /**
     * Get the list of verified Quality Edit IDs
     *
     * @return {Array} edit ids
     */
    this.getVerifiedQualityEditIds = function() {
        return session.verifiedQualityEdits;
    };

    /**
     * Add an editId to a list of verified Quality edits
     *
     * @param {String} editId to be added
     * @return {Array} verified quality edits
     */
    this.addToVerifiedQualityEdits = function (editId) {
        if (session.verifiedQualityEdits.indexOf(editId) === -1) {
            session.verifiedQualityEdits.push(editId);
        }
        return session.verifiedQualityEdits;
    };

    /**
     * Remove a specified Quality edit from the list of verified
     *
     * @param {String} editId to be removed
     * @return {Array} verified quality edits
     */
    this.removeVerifiedQualityEdit = function (editId) {
        var currIdx = session.verifiedQualityEdits.indexOf(editId);
        session.verifiedQualityEdits.splice(currIdx, 1);
        return session.verifiedQualityEdits;
    };

    // ## Macro Edits

    /**
    * Get the list of verified Macro Edit IDs
     *
     * @return {Array} edit ids
     */
    this.getVerifiedMacroEditIds = function() {
        return Object.keys(session.verifiedMacroEdits);
    };

    /**
     * Add an editId to a list of verified Macro edits
     *
     * @param {String} editId to be added
     * @param {String} reason
     * @return {Array} verified macro edits
     */
    this.addToVerifiedMacroEdits = function (editId, reason) {
        if (reason !== undefined) {
            session.verifiedMacroEdits[editId] = reason;
        }
        return this.getVerifiedMacroEditIds();
    };

    /**
     * Remove a specified Macro edit from the list of verified
     *
     * @param {String} editId to be removed
     * @return {Array} verified macro edits
     */
    this.removeVerifiedMacroEdit = function (editId) {
        delete session.verifiedMacroEdits[editId];
        return this.getVerifiedMacroEditIds();
    };

    /**
     * Get the verification reason for a specific Macro or Special edit by Id
     *
     * @param {String} editId
     * @return {String|Object} reason
     */
    this.getVerifiedReasonByEditId = function(editId) {
        if (session.verifiedMacroEdits[editId] !== undefined) {
            return session.verifiedMacroEdits[editId];
        } else if (session.verifiedSpecialEdits[editId] !== undefined) {
            return angular.copy(session.verifiedSpecialEdits[editId]);
        }
        return undefined;
    };

    // ## Special Edits

    /**
     * Get the list of verified Special Edit IDs
     *
     * @return {Array} edit ids
     */
    this.getVerifiedSpecialEditIds = function() {
        return Object.keys(session.verifiedSpecialEdits);
    };

    /**
     * Add an editId to a list of verified Special edits
     *
     * @param {String} editId to be added
     * @param {Array} selected options
     * @return {Object} verified special edits
     */
    this.addToVerifiedSpecialEdits = function (editId, selected) {
        session.verifiedSpecialEdits[editId] = selected;
        return session.verifiedSpecialEdits;
    };

    /**
     * Remove a specified Special edit from the list of verified
     *
     * @param {String} editId to be removed
     * @return {Object} verified special edits
     */
    this.removeVerifiedSpecialEdit = function (editId) {
        delete session.verifiedSpecialEdits[editId];
        return session.verifiedSpecialEdits;
    };

    // ## IRS Report

    /**
     * Has the IRS Report been verified?
     *
     * @return {Boolean}
     */
    this.hasVerifiedIRSReport = function() {
        return session.verifiedIRSReport;
    };

    /**
     * Mark the IRS Report as verified
     *
     * @return {Boolean}
     */
    this.verifyIRSReport = function() {
        session.verifiedIRSReport = true;
        return session.verifiedIRSReport;
    };

    /**
     * Mark the IRS Report as unverified
     *
     * @return {Boolean}
     */
    this.unverifyIRSReport = function() {
        session.verifiedIRSReport = false;
        return session.verifiedIRSReport;
    };
};
