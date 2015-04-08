var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

module.exports = function() {

    this.Given(/^that I am at the HMDA homepage$/, function(next) {
        browser.get('http://dev.hmda-pilot.ec2.devis.com/#/');
        //Prevents "are you sure you want to leave?" window from popping up
        browser.executeScript("window.onbeforeunload = function(){};");
        browser.debugger();
        //It seems that Protractor is at least partially running test code
        // before the tests themselves have started, for some reason.
        //Without having a decent period on the page before running next()
        //in this preload period, it will fail. This hack, which slows things
        //significantly on page load, fixes that problem until I can find a better solution.
        setTimeout(function(){
            next();
        },5000);
    });
};
