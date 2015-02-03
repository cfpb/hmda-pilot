/*global jQuery:true*/

'use strict';

require('angular');
require('angular-mocks');

describe('Directive: cfButton', function () {

    var element,
        scope;

    beforeEach(angular.mock.module('hmdaPilotApp'));

    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
    }));

    describe('by default', function() {
        beforeEach(inject(function ($compile) {
            element = angular.element('<cf-button>A Button</cf-button>');
            element = $compile(element)(scope);
            scope.$digest();
        }));

        it('should have type="submit", if not specified', function() {
            expect(element.attr('type')).toBeDefined();
            expect(element.attr('type')).toBe('submit');
        });

        it('should have the "btn" class', function() {
            expect(element.hasClass('btn')).toBeTruthy();
        });

        it('should not have the disabled property', function() {
            expect(element.prop('disabled')).toBeFalsy();
        });

        it('should not have the disabled class', function() {
            expect(element.hasClass('btn__disabled')).toBeFalsy();
        });

        it('should display the button text', function() {
            expect(jQuery('.text', element).text()).toBe('A Button');
        });

        it('should not display "Processing..." text', function() {
            expect(jQuery('.text', element).text()).not.toBe('Processing...');
        });
    });

    describe('icon-class', function() {
        beforeEach(inject(function ($compile) {
            element = angular.element('<cf-button icon-class="test">A Button</cf-button>');
            element = $compile(element)(scope);
            scope.$digest();
        }));

        it('should display the named icon on the right by default', function() {
            var el = jQuery('.cf-icon-test', element).parent();
            expect(el.hasClass('btn_icon__right')).toBeTruthy();
        });
    });

    describe('icon-position', function() {
        beforeEach(inject(function ($compile) {
            element = angular.element('<cf-button icon-class="test" icon-position="left">A Button</cf-button>');
            element = $compile(element)(scope);
            scope.$digest();
        }));

        it('should display the icon on the left when specified', function() {
            var el = jQuery('.cf-icon-test', element).parent();
            expect(el.hasClass('btn_icon__left')).toBeTruthy();
        });
    });

    describe('if processing', function() {
        beforeEach(inject(function ($compile) {
            scope.isProcessing = true;
            element = angular.element('<cf-button icon-class="test" processing="isProcessing">A Button</cf-button>');
            element = $compile(element)(scope);
            scope.$digest();
        }));

        it('should disable the button', function() {
            expect(element.prop('disabled')).toBeTruthy();
            expect(element.hasClass('btn__disabled')).toBeTruthy();
        });

        it('should change the button text to "Processing..."', function() {
            var el = jQuery('span.text', element);
            expect(el.text()).toBe('Processing...');
            expect(element.hasClass('btn-processing')).toBeTruthy();
        });

        it('should display a spinning update icon', function() {
            var el = jQuery('span.cf-icon', element);
            expect(el.hasClass('cf-icon-update')).toBeTruthy();
            expect(el.hasClass('cf-spin')).toBeTruthy();
        });
    });

    describe('if processing turns off', function() {
        beforeEach(inject(function ($compile) {
            scope.isProcessing = true;
            element = angular.element('<cf-button icon-class="test" processing="isProcessing">A Button</cf-button>');
            element = $compile(element)(scope);
            scope.$digest();
            // Make sure that the processing is being triggered
            expect(element.prop('disabled')).toBeTruthy();
            expect(element.hasClass('btn__disabled')).toBeTruthy();
            // Turn off processing
            scope.isProcessing = false;
            scope.$digest();
        }));

        it('should enable the button', function() {
            expect(element.prop('disabled')).toBeFalsy();
            expect(element.hasClass('btn__disabled')).toBeFalsy();
        });

        it('should reset the button text to "A Button"', function() {
            var el = jQuery('span.text', element);
            expect(el.text()).toBe('A Button');
            expect(element.hasClass('btn-processing')).toBeFalsy();
        });

        it('should reset to the initial icon', function() {
            var el = jQuery('span.cf-icon', element);
            expect(el.hasClass('cf-icon-test')).toBeTruthy();
            expect(el.hasClass('cf-icon-update')).toBeFalsy();
            expect(el.hasClass('cf-spin')).toBeFalsy();
        });
    });

    describe('when isDisabled evals to true', function() {
        beforeEach(inject(function ($compile) {
            scope.hasNext = function() { return true; };
            element = angular.element('<cf-button is-disabled="hasNext()">A Button</cf-button>');
            element = $compile(element)(scope);
            scope.$digest();
        }));

        it('should disable the button', function() {
            expect(element.prop('disabled')).toBeTruthy();
            expect(element.hasClass('btn__disabled')).toBeTruthy();
        });
    });

    describe('when the button has type="submit"', function() {
        beforeEach(inject(function ($compile) {
            element = angular.element('<cf-button type="submit">A Button</cf-button>');
            element = $compile(element)(scope);
            scope.$digest();
        }));

        it('should pass through type="submit"', function() {
            expect(element.attr('type')).toBeDefined();
            expect(element.attr('type')).toBe('submit');
        });
    });

    describe('when the button has ngClick', function() {
        beforeEach(inject(function ($compile) {
            element = angular.element('<cf-button ng-click="action()">A Button</cf-button>');
            element = $compile(element)(scope);
            scope.$digest();
        }));

        it('should pass through the ngClick attr', function() {
            expect(element.attr('ng-click')).toBeDefined();
            expect(element.attr('ng-click')).toBe('action()');
        });

        it('should not include type="submit"', function() {
            expect(element.attr('type')).toBeUndefined();
        });
    });
});
