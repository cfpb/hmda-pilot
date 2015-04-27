'use strict';

/**
 * Maintain information about the current session. Useful for sharing
 * information between controllers.
 *
 * @namespace hmdaPilotApp
 * @module {Service} Session
 */
module.exports = /*@ngInject*/ function($cookies, $cookieStore, Configuration) {

    var session = {
            verifiedQualityEdits: [],
            verifiedMacroEdits: {},
            verifiedSpecialEdits: {},
            verifiedIRSReport: false
        };

    /**
     * Get the current session
     *
     * @return {object} Session
     */
    this.getSession = function() {
        return session;
    };

    /**
     * Checks to see if the session is valid based on session cookie expiration
     * @return {Boolean}
     */
    this.isValidSession = function() {
        if ($cookieStore.get('validSession')) {
            return true;
        }
        return false;
    };

    /**
     * Authenticate with a password.
     * @param  {String} password Password
     * @return {Boolean}         Was authentication successful
     */
    this.authenticate = function(password) {
        if (password === Configuration.validPassword) {
            $cookieStore.put('validSession', 'true');
            return true;
        }
        return false;
    };

    /**
     * Reset the current session to defaults
     *
     * @return {object} session
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
     * @param {string} editId
     * @return {boolean}
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
     * @param {string} editId to be added
     * @return {Array} verified quality edits
     */
    this.addToVerifiedQualityEdits = function(editId) {
        if (session.verifiedQualityEdits.indexOf(editId) === -1) {
            session.verifiedQualityEdits.push(editId);
        }

        return session.verifiedQualityEdits;
    };

    /**
     * Remove a specified Quality edit from the list of verified
     *
     * @param {string} editId to be removed
     * @return {Array} verified quality edits
     */
    this.removeVerifiedQualityEdit = function(editId) {
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
     * @param {string} editId to be added
     * @param {string} reason
     * @return {Array} verified macro edits
     */
    this.addToVerifiedMacroEdits = function(editId, reason) {
        if (reason !== undefined) {
            session.verifiedMacroEdits[editId] = reason;
        }

        return this.getVerifiedMacroEditIds();
    };

    /**
     * Remove a specified Macro edit from the list of verified
     *
     * @param {string} editId to be removed
     * @return {Array} verified macro edits
     */
    this.removeVerifiedMacroEdit = function(editId) {
        delete session.verifiedMacroEdits[editId];
        return this.getVerifiedMacroEditIds();
    };

    /**
     * Get the verification reason for a specific Macro or Special edit by Id
     *
     * @param {string} editId
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
     * @param {string} editId to be added
     * @param {Array} selected options
     * @return {object} verified special edits
     */
    this.addToVerifiedSpecialEdits = function(editId, selected) {
        session.verifiedSpecialEdits[editId] = selected;
        return session.verifiedSpecialEdits;
    };

    /**
     * Remove a specified Special edit from the list of verified
     *
     * @param {string} editId to be removed
     * @return {object} verified special edits
     */
    this.removeVerifiedSpecialEdit = function(editId) {
        delete session.verifiedSpecialEdits[editId];
        return session.verifiedSpecialEdits;
    };

    // ## IRS Report

    /**
     * Has the IRS Report been verified?
     *
     * @return {boolean}
     */
    this.hasVerifiedIRSReport = function() {
        return session.verifiedIRSReport;
    };

    /**
     * Mark the IRS Report as verified
     *
     * @return {boolean}
     */
    this.verifyIRSReport = function() {
        session.verifiedIRSReport = true;
        return session.verifiedIRSReport;
    };

    /**
     * Mark the IRS Report as unverified
     *
     * @return {boolean}
     */
    this.unverifyIRSReport = function() {
        session.verifiedIRSReport = false;
        return session.verifiedIRSReport;
    };
};
