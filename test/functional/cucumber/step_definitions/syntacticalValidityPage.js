var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

module.exports = function() {

    this.Then(/^I see an electronic report showing how many syntactical edits failed$/, function(next) {
        expect(element(by.id('syntactical')).isPresent()).to.eventually.be.true.notify(next);
    });

    this.Then(/^I see an electronic report showing how many validity edits failed$/, function(next) {
        expect(element(by.id('validity')).isPresent()).to.eventually.be.true.notify(next);
    });
};
