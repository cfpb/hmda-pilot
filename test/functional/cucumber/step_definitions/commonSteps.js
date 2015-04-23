var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

module.exports = function() {

    disclaimer = element(by.css('div.disclaimer'));

    this.Given(/^that I am at the HMDA homepage$/, function(next) {
        browser.get('http://dev.hmda-pilot.ec2.devis.com/#/');
        //Prevents 'are you sure you want to leave?' window from popping up
        browser.executeScript('window.onbeforeunload = function(){};').then(function(){
            next();
        });
    });

    this.Then(/^I will see a disclaimer at the top$/, function(next) {
        expect(disclaimer.isPresent()).to.eventually.be.true.notify(next);
    });
};
