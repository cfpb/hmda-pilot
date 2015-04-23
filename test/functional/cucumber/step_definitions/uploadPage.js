var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

//Necessary for uploading a file
var path = require('path');

//Defining page elements
var pageErrors = element.all(by.css('.page-errors'));
var submitButton = element(by.css('.form-buttons button'));

module.exports = function() {

    selectFile = function(fileName){
        var deferred = protractor.promise.defer();
        var fileSelector = element(by.id('file'));

        //Get filename as argument, convert into path, send path to selector on site.
        var fileToUpload = '../files/'+fileName;
        var absolutePath = path.resolve(__dirname, fileToUpload);

        fileSelector.sendKeys(absolutePath);
        deferred.fulfill();
        return deferred.promise;
    }

    this.When(/^I upload the '([^']*)' file for validation$/, function(fileName, next) {
        selectFile(fileName).then(function(){
            next();
        });
    });

    this.When(/^I upload the '([^']*)' file and submit$/, function(fileName, next) {
        selectFile(fileName).then(function(){
            submitButton.click();
        }).then(function(){
            next();
        });
    });

    this.When(/^I click the submit button$/, function(next) {
        submitButton.click().then(function(){
            next();
        });
    });

    this.Then(/^I am notified that the format is incorrect$/, function(next) {
        expect(pageErrors.count()).to.eventually.equal(1).then(function(){
            next();
        });
    });

    this.Then(/^I am not notified that the format is incorrect$/, function(next) {
        expect(pageErrors.count()).to.eventually.equal(0).then(function(){
            next();
        });
    });
};
