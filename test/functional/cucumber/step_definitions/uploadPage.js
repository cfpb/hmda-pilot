/* jshint expr:true, -W079 */
'use strict';

var chai = require('chai'),
    expect = chai.expect,
    chaiAsPromised = require('chai-as-promised'),
    remote = require('protractor/node_modules/selenium-webdriver/remote');

chai.use(chaiAsPromised);

//Necessary for uploading a file
var path = require('path');

//Defining page elements
var pageErrors = element.all(by.css('.page-errors'));

module.exports = function() {

    var selectFile = function(fileName) {
        var deferred = protractor.promise.defer();
        var fileSelector = element(by.id('file'));

        browser.driver.setFileDetector(new remote.FileDetector());

        //Get filename as argument, convert into path, send path to selector on site.
        var fileToUpload = '../files/' + fileName;
        var absolutePath = path.resolve(__dirname, fileToUpload);

        fileSelector.sendKeys(absolutePath);
        deferred.fulfill();
        return deferred.promise;
    };

    this.When(/^I upload the '([^']*)' file for validation$/, function(fileName, next) {
        selectFile(fileName).then(function() {
            next();
        });
    });

    this.Then(/^I am notified that the format is incorrect$/, function(next) {
        expect(pageErrors.count()).to.eventually.equal(1).then(function() {
            next();
        });
    });

    this.Then(/^I am not notified that the format is incorrect$/, function(next) {
        expect(pageErrors.count()).to.eventually.equal(0).then(function() {
            next();
        });
    });
};
