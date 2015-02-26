'use strict';

require('angular');
require('angular-mocks');

describe('Service: Session', function () {

    var service;

    beforeEach(angular.mock.module('hmdaPilotApp'));

    beforeEach(inject(function (_Session_) {
        service = _Session_;
    }));

    describe('addToVerifiedQualityEdits()', function() {
        it('should add a string to the array of validated Quality Edit IDs', function() {
            service.addToVerifiedQualityEdits('V100');
            expect(service.getVerifiedQualityEditIds()).toContain('V100');
        });
    });

    describe('addToVerifiedMacroEdits()', function() {
        it('should add a string to the array of validated Macro Edit IDs', function() {
            service.addToVerifiedMacroEdits('V100');
            expect(service.getVerifiedMacroEditIds()).toContain('V100');
        });
    });

    describe('removeVerifiedQualityEdit()', function() {
        it('should remove the id from the array of validated Quality Edit IDs', function() {
            service.addToVerifiedQualityEdits('V100');
            expect(service.removeVerifiedQualityEdit('V100')).not.toContain('V100');
        });
    });

    describe('removeVerifiedMacroEdit()', function() {
        it('should remove the id from the array of validated Macro Edit IDs', function() {
            service.addToVerifiedQualityEdits('V100');
            expect(service.removeVerifiedMacroEdit('V100')).not.toContain('V100');
        });
    });

    describe('isVerified()', function() {
        it('should return true if an Edit ID was saved as a Quality Edit ID', function() {
            service.addToVerifiedQualityEdits('V100');
            expect(service.isVerified('V100')).toBeTruthy();
        });

        it('should return true if an Edit ID was saved as a Macro Edit ID', function() {
            service.addToVerifiedMacroEdits('V100', 'test');
            expect(service.isVerified('V100')).toBeTruthy();
        });

        it('should return true if an Edit ID was saved as a Special Edit ID', function() {
            service.addToVerifiedSpecialEdits('V100');
            expect(service.isVerified('V100')).toBeTruthy();
        });

        it('should return false if the Edit ID was not found', function() {
            expect(service.isVerified('V999')).toBeFalsy();
        });
    });

    describe('getVerifiedReasonByEditId()', function() {
        it('should return a reason an edit was verified', function() {
            service.addToVerifiedMacroEdits('V100', 'test');
            expect(service.getVerifiedReasonByEditId('V100')).toBe('test');
        });
    });

    describe('reset()', function() {
        it('should reset the current session', function() {
            service.reset();
            expect(service.getSession().verifiedQualityEdits).toEqual([]);
            expect(service.getSession().verifiedMacroEdits).toEqual({});
        });
    });
});
