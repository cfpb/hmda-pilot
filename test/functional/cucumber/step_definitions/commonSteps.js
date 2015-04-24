var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

module.exports = function() {

    disclaimer = element(by.css('div.disclaimer'));

    this.Given(/^that I am at the HMDA homepage$/, function(next) {
        passwordBox = element.all(by.id('txt-pwd'));
        loginButton = element.all(by.css('.login-button'))

        browser.get('http://dev.hmda-pilot.ec2.devis.com/#/');

        //Prevents 'are you sure you want to leave?' window from popping up
        browser.executeScript('window.onbeforeunload = function(){};').then(function(){
            if(passwordBox.count() !== 0){
                //Log in if we have not already done so
                passwordBox.sendKeys('p1l0t');
                loginButton.click();
            }
        });
            next();
    });

    this.Then(/^I will see a disclaimer at the top$/, function(next) {
        expect(disclaimer.isPresent()).to.eventually.be.true.notify(next);
    });
};
