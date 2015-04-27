/* jshint expr:true, -W079 */
'use strict';

var chai = require('chai'),
    expect = chai.expect,
    chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

var submitButton = element(by.css('.form-buttons button'));
var progressModal = element(by.css('div.ngdialog'));

module.exports = function() {
    this.Then(/^a progress bar displaying that the system is processing the file is displayed$/, function(next) {
        expect(progressModal.isPresent()).to.eventually.be.true.notify(next);
    });

    this.Then(/^the submit button is disabled while the file I selected is processing$/, function(next) {
        // submit button gets disabled by the modal's zindex being larger than anything else
        submitButton.getCssValue('zIndex').then(function(buttonLayer) {
            var submitZIndex = (buttonLayer === 'auto') ? 0 : buttonLayer;
            expect(progressModal.getCssValue('zIndex')).to.eventually.be.gt(submitZIndex).notify(next);
        });
    });

};
