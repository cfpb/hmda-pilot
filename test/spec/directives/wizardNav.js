/*global jQuery:true*/

'use strict';

require('angular');
require('angular-mocks');

describe('Directive: WizardNav', function () {

    beforeEach(angular.mock.module('hmdaPilotApp'));

    var element,
        scope,
        StepFactory,
        Wizard;

    beforeEach(inject(function ($templateCache) {
        var templateUrl = 'partials/wizardNav.html';
        var asynchronous = false;

        var req = new XMLHttpRequest();
        req.onload = function () {
            $templateCache.put(templateUrl, this.responseText);
        };
        req.open('get', '/base/app/' + templateUrl, asynchronous);
        req.send();
    }));

    beforeEach(inject(function ($rootScope, $compile, _StepFactory_, _Wizard_) {
        StepFactory = _StepFactory_;
        Wizard = _Wizard_;

        scope = $rootScope.$new();

        var stepData = [
            new StepFactory('Step 1', 'step1'),
            new StepFactory('Step 2', 'step2'),
            new StepFactory('Step 3', 'step3')
        ];
        Wizard.initSteps(stepData);
        Wizard.completeStep();

        scope.steps = stepData;
        var html = '<wizard-nav steps="steps"></wizard-nav>';
        element = $compile(html)(scope);
        scope.$digest();
    }));

    it('should display a link for the currently active step ', function () {
        expect(jQuery('li.active > a.title', element)).toBeDefined();
    });

    it('should not display a link for incomplete steps', function () {
        expect(jQuery('li.incomplete > span.title', element)).toBeDefined();
    });

    it('should display a number badge for an incomplete step', function () {
        expect(jQuery('li.incomplete > span.step-badge', element).hasClass('badge-num')).toBeTruthy();
        expect(jQuery('li.incomplete > span.step-badge', element).eq(0).text()).toBe('3');
    });

    it('should display an approved badge for a completed step', function () {
        expect(jQuery('li.complete > span.step-badge', element).hasClass('cf-icon-approved')).toBeTruthy();
    });

    it('should allow a completed step to be focusable', function () {
        expect(jQuery('li.complete', element).hasClass('focusable')).toBeTruthy();
    });
});
