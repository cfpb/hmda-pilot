var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

module.exports = function() {
    this.When(/^I click on the 'IRS report' link$/, function (next) {
        var irsReportLink = element(by.linkText('IRS'));
        irsReportLink.click().then(function() {
            next();
        })
    });

    this.Then(/^I will see the IRS report$/, function (next) {
        expect(element(by.id('IRS')).isPresent()).to.eventually.be.true.notify(next);
    });

    this.Then(/^I will see a certification of IRS accuracy$/, function (next) {
        expect(element(by.id('verify')).isPresent()).to.eventually.be.true.notify(next);
    });

};
