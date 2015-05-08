/* jshint expr:true, -W079 */
'use strict';

var chai = require('chai'),
    expect = chai.expect,
    chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

module.exports = function() {
    var disclaimer = element(by.css('div.disclaimer'));
    var passwordBox = element.all(by.id('txt-pwd')),
        loginButton = element.all(by.css('.login-button'));

    var overlay = element.all(by.css('div.ngdialog-overlay'));

    this.Given(/^that I am at the HMDA homepage$/, function(next) {
        // if session closed, create new session
        browser.get(browser.baseUrl);

        //Prevents 'are you sure you want to leave?' window from popping up
        browser.executeScript('window.onbeforeunload = function(){};').then(function() {
            if (passwordBox.count() !== 0) {
                //Log in if we have not already done so
                passwordBox.sendKeys('p1l0t');
                loginButton.click();
            }
            next();
        });

    });

    this.When(/^I click the localDB storage option$/, function(next) {
        var hmdaLocal = element(by.model('hmdaData.local'));

        // wait for login to disappear
        browser.wait(function() {
            return overlay.count().then(function(count) {
                return (count === 0);
            });
        }, 2000000).then(function() {
            hmdaLocal.click().then(function() {
                next();
            });
        });
    });

    this.Then(/^I will see a disclaimer at the top$/, function(next) {
        expect(disclaimer.isPresent()).to.eventually.be.true.notify(next);
    });
};
