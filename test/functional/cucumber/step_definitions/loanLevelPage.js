var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

module.exports = function() {

    this.When(/^I click on an edit failure section within the high level summary information$/, function (next) {
        element(by.partialLinkText('S0')).click().then(function() {
        	next();
        });
    });

    this.Then(/^I am able to see the summary and detail information about the edit failures$/, function (next) {
        expect(element(by.css('.line-number')).isPresent()).to.eventually.be.true;
        expect(element(by.css('.edit-explanation')).isPresent()).to.eventually.be.true;
        expect(element(by.binding('editError')).isPresent()).to.eventually.be.true.notify(next);
    });

};
