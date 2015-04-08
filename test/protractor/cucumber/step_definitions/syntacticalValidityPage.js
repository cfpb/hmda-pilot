var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

module.exports = function() {

    this.When(/^I wait for the file to be processed$/, function (next) {
        //Waits for URL to include "Syntactical"
        //TODO: Set to wait for URL to change at all. More flexible.
        browser.wait(function() {
            return browser.getCurrentUrl().then(function(url) {
                return (url.indexOf("Syntactical") !== -1);
            });
        }, 20000);

        next();
    });

    this.Then(/^I see an electronic report showing how many syntactical edits failed$/, function (next) {
        expect(element(by.id("syntactical")).isPresent()).to.eventually.be.true.notify(next);
    });

    this.Then(/^I see an electronic report showing how many validity edits failed$/, function (next) {
        expect(element(by.id("validity")).isPresent()).to.eventually.be.true.notify(next);
    });
};
