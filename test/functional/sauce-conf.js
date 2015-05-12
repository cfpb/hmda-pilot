'use strict';

// jscs:disable requirePaddingNewLinesBeforeLineComments

var sessionName = 'HMDA Pilot: Dev',
    browserWidth = 1280,
    browserHeight = 1024;

exports.config = {

    baseUrl: 'http://dev.hmda-pilot.devis.com/',

    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY,

    specs: ['cucumber/*.feature'],

    allScriptsTimeout: 30000,
    getPageTimeout: 30000,

    multiCapabilities: [{
        name: sessionName,
        browserName: 'internet explorer',
        platform: 'ANY',
        version: '10'
    }, {
        browserName: 'internet explorer',
        platform: 'ANY',
        version: '11'
    }, {
        name: sessionName,
        browserName: 'chrome',
        platform: 'ANY',
        version: '35' // Oldest supported version of Chrome (see COMMON_QUESTIONS.md)
    }, {
        name: sessionName,
        browserName: 'chrome',
        platform: 'ANY',
        version: '' // Blank defaults to latest version
    }, {
        name: sessionName,
        browserName: 'firefox',
        platform: 'ANY',
        version: '33' // Oldest supported version of Firefox (see COMMON_QUESTIONS.md)
    }, {
        name: sessionName,
        browserName: 'firefox',
        platform: 'ANY',
        version: '' // Blank defaults to latest version
    }],

    framework: 'cucumber',
    cucumberOpts: {
        require: 'cucumber/step_definitions/*.js',
        tags: ['~@wip', '~@ignore', '~@editCheck'],
        format: 'progress'
    },

    onPrepare: function() {
        browser.driver.manage().window().setSize(browserWidth, browserHeight);
    }
};
