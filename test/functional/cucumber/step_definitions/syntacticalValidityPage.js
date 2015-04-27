/* jshint expr:true, -W079 */
'use strict';

var chai = require('chai'),
    expect = chai.expect,
    chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

module.exports = function() {

    this.Then(/^I see an electronic report showing how many syntactical edits failed$/, function(next) {
        expect(element(by.id('syntactical')).isPresent()).to.eventually.be.true.notify(next);
    });

    this.Then(/^I see an electronic report showing how many validity edits failed$/, function(next) {
        expect(element(by.id('validity')).isPresent()).to.eventually.be.true.notify(next);
    });
};
