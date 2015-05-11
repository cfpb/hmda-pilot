/* jshint expr:true, -W079 */
'use strict';

var chai = require('chai'),
    expect = chai.expect,
    chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

module.exports = function() {
    this.Then(/^I am able to see the summary and detail information about the edit failures$/, function(next) {
        expect(element(by.css('.line-number')).isPresent()).to.eventually.be.true;
        expect(element(by.css('.edit-explanation')).isPresent()).to.eventually.be.true;
        expect(element(by.binding('editError')).isPresent()).to.eventually.be.true.notify(next);
    });

};
