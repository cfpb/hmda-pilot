var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

module.exports = function() {

    waitUrlChange = function(){
        //Waits for URL to change
        browser.getCurrentUrl().then(function(url){
            startUrl = url;
        });
        browser.wait(function() {
            return browser.getCurrentUrl().then(function(url) {
                return (url !== startUrl);
            });
        }, 20000);
    }

    this.When(/^I wait for the file to be processed$/, function (next) {
        waitUrlChange();
        next();
    });

    this.When(/^I continue to the quality and macro edit reports page$/, function (next) {

    });
};
