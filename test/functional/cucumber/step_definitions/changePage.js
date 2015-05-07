/* jshint expr:true, -W079 */
'use strict';

var chai = require('chai'),
    chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

var path = require('path');

module.exports = function() {
    var continueButton = element(by.buttonText('Continue'));
    var progressBar = element.all(by.css('div.ngdialog-overlay'));
    var currentPage;
    var submitButton = element(by.buttonText('Start validation'));

    var selectFile = function(fileName) {
        var deferred = protractor.promise.defer();
        var fileSelector = element(by.id('file'));

        //Get filename as argument, convert into path, send path to selector on site.
        var fileToUpload = '../files/' + fileName;
        var absolutePath = path.resolve(__dirname, fileToUpload);

        fileSelector.sendKeys(absolutePath);
        deferred.fulfill();
        return deferred.promise;
    };

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

    this.When(/^I upload the '([^']*)' file and submit$/, function(fileName, next) {
        selectFile(fileName).then(function() {
            browser.getCurrentUrl().then(function(url) {
                console.log(url);
                currentPage = url;

                browser.wait(function() {
                    return submitButton.isDisplayed().then(function(isVisible) {
                        return isVisible;
                    });
                }, 5000000).then(function() {
                    submitButton.click().then(function() {
                        next();
                    });
                });
            }); 
        });
    });

    this.When(/^I click the submit button$/, function(next) {
        browser.getCurrentUrl().then(function(url) {
            currentPage = url;
            console.log(currentPage);

            // sometimes an issue with the file selector still being displayed when the submit button is clicked
            browser.wait(function() {
                return submitButton.isDisplayed().then(function(isVisible) {
                    return isVisible;
                });
            }, 5000000).then(function() {
                submitButton.click().then(function() {
                    next();
                });
            });
        });
    });

    this.When(/^I wait for the file to be processed$/, function(next) {
        waitUrlChange().then(function() {
            next();
        });
    });

    this.When(/^I continue to the quality and macro edit reports page$/, function(next) {
        waitUrlChange(currentPage).then(function() {
            browser.getCurrentUrl().then(function(url) {
                currentPage = url;
                console.log(currentPage);

                // go to Quality/Macro page
                continueButton.click();
                waitUrlChange(currentPage).then(function() {
                    browser.getCurrentUrl().then(function(url) {
                        currentPage = url;
                        next();
                    });
                });
            });
        });
    });

    this.When(/^I continue to the msa and irs edit reports page$/, function(next) {
        waitUrlChange(currentPage).then(function() {
            browser.getCurrentUrl().then(function(url) {
                currentPage = url;
                console.log(currentPage);

                // go to Quality/Macro page
                continueButton.click();
                waitUrlChange(currentPage).then(function() {
                    browser.getCurrentUrl().then(function(url) {
                        currentPage = url;
                        console.log(currentPage);

                        // go to MSA/Q029/IRS page
                        continueButton.click();
                        waitUrlChange(currentPage).then(function() {
                            browser.getCurrentUrl().then(function(url) {
                                currentPage = url;
                                console.log(currentPage);
                                next();
                            });
                        });
                    });
                });
            });
        });
    });

    this.When(/^I click on the '([^']*)' report link$/, function(reportName, next) {
        element(by.linkText(reportName)).click();
        waitUrlChange(currentPage).then(function() {
            browser.getCurrentUrl().then(function(url) {
                currentPage = url;
                console.log(currentPage);
                next();
            });
        });
    });

    this.When(/^I click on an '(.*)' edit failure section within the high level summary information$/, function(editname, next) {
        element.all(by.repeater('(key, value) in errors')).filter(function(elem) {
            return elem.element(by.css('.id')).getText().then(function(id) {
                if (id === editname) {
                    return true;
                }
                return false;
            });
        }).then(function(errorLinks) {
            errorLinks[0].element(by.linkText(editname)).click();
            next();
        });
    });

    this.When(/^I continue through the quality macro errors page$/, function(next) {
        waitUrlChange(currentPage).then(function() {
            browser.getCurrentUrl().then(function(url) {
                currentPage = url;
                continueButton.click();
                waitUrlChange(currentPage).then(function() {
                    browser.getCurrentUrl().then(function(url) {
                        currentPage = url;
                        element.all(by.partialLinkText('Q0')).then(function(macroErrors) {
                            macroErrors[0].click();
                            verifyMacroErrors (0, macroErrors.length).then(function() {
                                continueButton.click();
                                waitUrlChange(currentPage).then(function() {
                                    next();
                                });
                            });
                        });
                    });
                });
            });
        });
    });
};
