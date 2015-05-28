/* jshint expr:true, -W079 */
'use strict';

var chai = require('chai'),
    expect = chai.expect,
    chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

module.exports = function() {
    this.Then(/^I am unable to continue to the next page$/, function(next) {
        element.all(by.css('.btn__disabled')).then(function(continueButton) {
            continueButton[0].getText().then(function(text) {
                expect(text).is.equal('Continue');
                next();
            });
        });
    });

    this.Then(/^I can continue to the next page$/, function(next) {
        element.all(by.css('.btn__disabled')).count().then(function(count) {
            expect(count).is.equal(0);
            next();
        });
    });
};
