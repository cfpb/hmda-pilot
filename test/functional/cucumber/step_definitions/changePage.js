/* jshint expr:true, -W079 */
'use strict';

var chai = require('chai'),
    chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

module.exports = function() {
    var continueButton = element(by.buttonText('Continue'));
    var progressBar = element.all(by.css('div.ngdialog-overlay'));

    var verifyMacroErrors = function(index, numErrors) {
        return element(by.model('response.verified')).click().then(function() {
            var optionsElements = element(by.model('response.reason')).all(by.tagName('option'));
            optionsElements.get(1).click().then(function() {
                return element(by.buttonText('Save and continue')).click().then(function() {
                    if (index === numErrors - 1) {
                        return;
                    } else {
                        return verifyMacroErrors (index + 1, numErrors);
                    }
                });
            });
        });
    };

    var waitUrlChange = function(oldUrl) {
        //Finding start URL within fn is slow, and can happen after a quick page change has occurred
        //As such, you can pass a start URL (as string) to it and that will be used.
        //If URL wasn't passed, find one here. Can lead to timeouts with a quick page change
        if (!oldUrl) {
            browser.getCurrentUrl().then(function(url) {
                oldUrl = url;
            });
        }

        //Fulfill and return promise when URL changes and no progress bar exists
        var pageChangeConditions = [
            browser.wait(function() {
                return browser.getCurrentUrl().then(function(url) {
                    return (url !== oldUrl);
                });
            }, 2000000),
            browser.wait(function() {
                return progressBar.count().then(function(count) {
                    return (count === 0);
                });
            }, 2000000)
        ];

        return protractor.promise.all(pageChangeConditions);
    };

    this.When(/^I wait for the file to be processed$/, function(next) {
        waitUrlChange().then(function() {
            next();
        });
    });

    this.When(/^I continue to the quality and macro edit reports page$/, function(next) {
        var recentlyChangedUrl;
        waitUrlChange().then(function() {
            browser.getCurrentUrl().then(function(url) {
                recentlyChangedUrl = url;
            }).then(function() {
                continueButton.click();
            }).then(function() {
                waitUrlChange(recentlyChangedUrl);
            }).then(function() {
                next();
            });
        });
    });

    this.When(/^I continue to the msa and irs edit reports page$/, function(next) {
        waitUrlChange().then(function() {
            continueButton.click();
            waitUrlChange().then(function() {
                continueButton.click();
                waitUrlChange().then(function() {
                    continueButton.click();
                    next();
                });
            });
        });
    });

    this.When(/^I continue through the quality macro errors page$/, function(next) {
        waitUrlChange().then(function() {
            continueButton.click();
            waitUrlChange().then(function() {
                element.all(by.partialLinkText('Q0')).then(function(macroErrors) {
                    macroErrors[0].click();
                    verifyMacroErrors (0, macroErrors.length).then(function() {
                        continueButton.click();
                        waitUrlChange().then(function() {
                            next();
                        });
                    });
                });
            });
        });
    });
};
