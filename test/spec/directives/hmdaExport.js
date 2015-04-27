'use strict';

require('angular');
require('angular-mocks');

describe('Directive: hmdaExport', function() {

    var element,
        scope,
        HMDAEngine;

    beforeEach(angular.mock.module('hmdaPilotApp'));

    beforeEach(inject(function($rootScope, _HMDAEngine_) {
        scope = $rootScope.$new();
        HMDAEngine = _HMDAEngine_;

        var exportPromise = {
            then: function(callback) {
                callback('csv');
            }
        };

        spyOn(HMDAEngine, 'exportTypePromise').and.returnValue(exportPromise);
        spyOn(HMDAEngine, 'exportIndividualPromise').and.returnValue(exportPromise);

    }));

    describe('when exporting all edits by type', function() {
        beforeEach(inject(function($compile) {
            element = angular.element('<button hmda-export export="all" type="syntactical">Export</button>');
            element = $compile(element)(scope);
            scope.$digest();
        }));

        it('should call exportTypePromise', function() {
            element.triggerHandler('click');
            expect(HMDAEngine.exportTypePromise).toHaveBeenCalled();
        });
    });

    describe('when exporting an individual edit', function() {
        beforeEach(inject(function($compile) {
            element = angular.element('<button hmda-export export="individual" type="syntactical" edit-id="S100">Export</button>');
            element = $compile(element)(scope);
            scope.$digest();
        }));

        it('should call exportIndividualPromise', function() {
            element.triggerHandler('click');
            expect(HMDAEngine.exportIndividualPromise).toHaveBeenCalled();
        });
    });

    describe('when an invalid export option is given', function() {
        beforeEach(inject(function($compile) {
            element = angular.element('<button hmda-export export="foo" type="syntactical" edit-id="S100">Export</button>');
            element = $compile(element)(scope);
            scope.$digest();
        }));

        it('should just return', function() {
            element.triggerHandler('click');
            expect(HMDAEngine.exportTypePromise).not.toHaveBeenCalled();
            expect(HMDAEngine.exportIndividualPromise).not.toHaveBeenCalled();
        });
    });
});
