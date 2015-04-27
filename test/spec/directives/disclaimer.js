/*global jQuery:true*/

'use strict';

require('angular');
require('angular-mocks');

describe('Directive: Disclaimer', function() {

    beforeEach(angular.mock.module('hmdaPilotApp'));

    var element,
        scope,
        $el;

    beforeEach(inject(function($templateCache) {
        var directiveTemplate = null;
        var templateId = 'partials/disclaimer.html';
        var req = new XMLHttpRequest();
        req.onload = function() {
            directiveTemplate = this.responseText;
        };
        req.open('get', '/base/app/' + templateId, false);
        req.send();
        $templateCache.put(templateId, directiveTemplate);
    }));

    beforeEach(inject(function($rootScope, $compile) {
        scope = $rootScope.$new();
        element = angular.element('<disclaimer></disclaimer>');
        element = $compile(element)(scope);
        scope.$digest();
        $el = jQuery(element);
    }));

    describe('onLoad', function() {
        it('should display the disclaimer text', function() {
            expect($el.find('h2')).toBeDefined();
            expect($el.find('p')).toBeDefined();
        });

        it('should display the "collapse" button', function() {
            expect($el.find('button').text()).toBe('collapse ');
            expect($el.find('button > span').hasClass('cf-icon-up')).toBeTruthy();
        });

        it('should not have a "collapsed" class on the element', function() {
            expect($el.hasClass('collapsed')).toBeFalsy();
        });
    });

    describe('on toggle - hide', function() {
        it('should hide the disclaimer text', function() {
            $el.find('button').click();
            expect($el.find('h2')).toBeDefined();
            expect($el.find('p').hasClass('u-visually-hidden')).toBeTruthy();
        });

        it('should modify the button to "more info"', function() {
            $el.find('button').click();
            expect($el.find('button').text()).toBe('more info ');
            expect($el.find('button > span').hasClass('cf-icon-down')).toBeTruthy();
        });

        it('should add a "collapsed" class to the element', function() {
            $el.find('button').click();
            expect($el.hasClass('collapsed')).toBeTruthy();
        });
    });

    describe('on toggle - show', function() {
        beforeEach(function() {
            // toggle to the collapsed state
            $el.find('button').click();
        });

        it('should show the disclaimer text', function() {
            $el.find('button').click();
            expect($el.find('h2')).toBeDefined();
            expect($el.find('p').hasClass('u-visually-hidden')).toBeFalsy();
        });

        it('should modify the button to "collapse"', function() {
            $el.find('button').click();
            expect($el.find('button').text()).toBe('collapse ');
            expect($el.find('button > span').hasClass('cf-icon-up')).toBeTruthy();
        });

        it('should remove the "collapsed" class from the element', function() {
            $el.find('button').click();
            expect($el.hasClass('collapsed')).toBeFalsy();
        });
    });
});
