var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

module.exports = function() {

    this.Then(/^I see an electronic report showing how many quality edits failed$/, function(next) {
        expect(element(by.id('quality')).isPresent()).to.eventually.be.true.notify(next);
    });

    this.Then(/^I see an electronic report showing how many macro edits failed$/, function(next) {
        expect(element(by.id('macro')).isPresent()).to.eventually.be.true.notify(next);
    });

};
