/* jshint expr:true, -W079 */
'use strict';

var chai = require('chai'),
    chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

module.exports = function() {
    var continueButton = element(by.buttonText('Continue'));
    var progressBar = element.all(by.css('div.ngdialog-overlay'));
    var currentPage;
    var submitButton = element(by.buttonText('Start validation'));

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

    var continueToNextPage = function() {
        var deferred = protractor.promise.defer();
        waitUrlChange().then(function() {
            browser.getCurrentUrl().then(function(url) {
                currentPage = url;
                continueButton.click();
                deferred.fulfill();
            });
        });

        return deferred.promise;
    };

    var waitForNextPage = function(next) {
        waitUrlChange().then(function() {
            browser.getCurrentUrl().then(function(url) {
                currentPage = url;
                next();
            });
        });
    };

    var waitUrlChange = function() {
        //Fulfill and return promise when URL changes and no progress bar exists
        var pageChangeConditions = [
            browser.wait(function() {
                return browser.getCurrentUrl().then(function(url) {
                    return (url !== currentPage);
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

    this.When(/^I click the submit button$/, function(next) {
        browser.getCurrentUrl().then(function(url) {
            currentPage = url;

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

    this.When(/^I continue to the syntactical and validity edit reports page$/, function(next) {
        waitForNextPage(next);
    });

    this.When(/^I continue to the quality and macro edit reports page$/, function(next) {
        continueToNextPage().then(function() {
            waitForNextPage(next);
        });
    });

    this.When(/^I continue to the msa and irs edit reports page$/, function(next) {
        continueToNextPage().then(function() {
            continueToNextPage().then(function() {
                waitForNextPage(next);
            });
        });
    });

    this.When(/^I click on the '([^']*)' report link$/, function(reportName, next) {
        element(by.linkText(reportName)).click();
        waitForNextPage(next);
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
            waitForNextPage(next);
        });
    });

    this.When(/^I continue through the quality macro errors page$/, function(next) {
        var continueThroughQualityErrors = function() {
            element.all(by.partialLinkText('Q0')).then(function(macroErrors) {
                macroErrors[0].click();
                verifyMacroErrors(0, macroErrors.length).then(function() {
                    continueButton.click();
                    waitForNextPage(next);
                });
            });
        };

        continueToNextPage().then(function() {
            waitForNextPage(continueThroughQualityErrors);
        });
    });

    this.When(/^I correct all macro errors$/, function(next) {
        element(by.id('macro')).all(by.partialLinkText('Q0')).then(function(macroErrors) {
            macroErrors[0].click();
            verifyMacroErrors(0, macroErrors.length).then(function() {
                next();
            });
        });
    });

    this.When(/^I correct all quality errors$/, function(next) {
        var verifyAndContinue = function(index, numErrors, callback) {
            element(by.model('response.verified')).click().then(function() {
                element(by.buttonText('Save and continue')).click();
                waitForNextPage(function() {
                    if (index === numErrors) {
                        next();
                    } else {
                        callback(index + 1, numErrors);
                    }
                });
            });
        };

        var continueThroughQualityErrors = function(index, numErrors) {
            element(by.binding('entries')).getText().then(function(actualCount) {
                element(by.model('$parent.paginate.pageSize')).$('option:checked').getText().then(function(pageSize) {
                    var totalPages = actualCount.match(/\((.+?) /)[1] / pageSize;
                    if (totalPages > 1) {
                        element(by.model('currentPage')).clear();
                        element(by.model('currentPage')).sendKeys(totalPages).then(function() {
                            element(by.css('.pagination_submit')).click();
                            verifyAndContinue(index, numErrors, continueThroughQualityErrors);
                        });
                    } else {
                        verifyAndContinue(index, numErrors, continueThroughQualityErrors);
                    }
                });
            });
        };

        element(by.id('quality')).all(by.partialLinkText('Q0')).then(function(qualityErrors) {
            qualityErrors[0].click();
            continueThroughQualityErrors(0, qualityErrors.length);
        });
    });

    this.When(/^I correct all report errors$/, function(next) {
        // for now this means just visiting the page
        element(by.buttonText('Save and continue')).click();
        waitForNextPage(next);
    });

    this.When(/^I verify the 'IRS' report and continue$/, function(next) {
        browser.getCurrentUrl().then(function(url) {
            currentPage = url;
            element(by.id('verify')).click();
            element(by.buttonText('Save and continue')).click();
            waitForNextPage(function() {
                continueButton.click();
                waitForNextPage(next);
            });
        });
    });
};
