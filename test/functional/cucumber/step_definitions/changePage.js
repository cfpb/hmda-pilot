var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

module.exports = function() {

    continueButton = element(by.buttonText("Continue"));

    waitUrlChange = function(startUrl){
        //Waits for URL to change before allowing execution to move forward. Timeout is at end of fn.
        //Finding start URL within fn is slow, and can happen after a quick page change has occurred
        //As such, you can pass a start URL (as string) to it and that will be used.
        var deferred = protractor.promise.defer();
        //If URL wasn't passed, find one here. Can lead to timeouts with a quick page change
        if(typeof startUrl === 'undefined'){
            browser.getCurrentUrl().then(function(url){
                oldUrl = url;
            });
        }
        //Otherwise, take passed URL to compare
        else{
            oldUrl = startUrl;
        }
        //Fulfill and return promise when URL changes
        browser.wait(function() {
            return browser.getCurrentUrl().then(function(url) {
                return (url !== oldUrl);
            });
        }, 2000000);
        deferred.fulfill();
        return deferred.promise;
    }

    this.When(/^I wait for the file to be processed$/, function (next) {
        waitUrlChange().then(function(){
            next();
        });
    });

    this.When(/^I continue to the quality and macro edit reports page$/, function (next) {
    var recentlyChangedUrl;
        waitUrlChange().then(function(){
            browser.getCurrentUrl().then(function(url){
                recentlyChangedUrl = url
            }).then(function(){
                continueButton.click();
            }).then(function(){
                waitUrlChange(recentlyChangedUrl);
            }).then(function(){
                next();
            });
        });
    });
};
