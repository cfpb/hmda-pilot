/* jshint expr:true, -W079 */
'use strict';

var chai = require('chai'),
    expect = chai.expect,
    chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

module.exports = function() {
    this.Then(/^I can verify that the number of '([^']*)' edit errors is '([^']*)'$/, function(editname, expectedCount, next) {
        element.all(by.repeater('(key, value) in errors')).filter(function(elem) {
            return elem.element(by.css('.id')).getText().then(function(id) {
                if (id === editname) {
                    return true;
                }
                return false;
            });
        }).then(function(errors) {
            errors[0].element(by.css('.count')).getText().then(function(actualCount) {
                if (actualCount !== expectedCount) {
                    console.log(editname);
                }
            });
            expect(errors[0].element(by.css('.count')).getText()).to.eventually.equal(expectedCount).notify(next);
        });
    });
};
