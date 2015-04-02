var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

//Necessary for uploading a file
var path = require('path');

//Defining page elements
var pageErrors = element(by.css(".page-errors"));
var submitButton = element(by.css(".form-buttons button"));
var fileSelector = element(by.id('file'));

module.exports = function() {

    this.When(/^I upload the "([^"]*)" file for validation$/, function (fileName, next) {
        //Get filename as argument, convert into path, send path to selector on site.
        var fileToUpload = '../files/'+fileName;
        var absolutePath = path.resolve(__dirname, fileToUpload);

        fileSelector.sendKeys(absolutePath);
        next();
    });

};
