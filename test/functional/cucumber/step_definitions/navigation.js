/* jshint expr:true, -W079 */
'use strict';

var chai = require('chai'),
    expect = chai.expect,
    chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

module.exports = function() {
    this.Then(/^I see a navigation wizard$/, function(next) {
        expect(element(by.css('.step')).isPresent()).to.eventually.be.true.notify(next);
    });

    this.Then(/^I can reset my session by clicking on the 'Select File' Tab$/, function(next) {
        element.all(by.css('.step-title')).filter(function(step) {
            return step.getText().then(function(stepTitle) {
                return (stepTitle === 'Select file & validate');
            });
        }).then(function(selectFileStep) {
            selectFileStep[0].click();
            expect(element(by.css('.btn__warning')).isPresent()).to.eventually.be.true.notify(next);
        });
    });

    this.Then(/^I can navigate to the '([^']*)' page by clicking the '([^']*)' Tab$/, function(pageUrl, targetStepTitle, next) {
        element.all(by.css('.step-title')).filter(function(step) {
            return step.getText().then(function(stepTitle) {
                return (stepTitle === targetStepTitle);
            });
        }).then(function(selectFileStep) {
            selectFileStep[0].click();
            browser.getCurrentUrl().then(function(url) {
                var targetUrl = browser.baseUrl + pageUrl;
                expect(url).to.equal(targetUrl);
                next();
            });
        });
    });
};
