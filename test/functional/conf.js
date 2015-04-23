exports.config = {

    baseUrl: 'http://localhost:9000/',

    specs: ['cucumber/MSAReport.feature'],

    allScriptsTimeout: 30000,
    getPageTimeout: 30000,

    capabilities: {
        browserName: 'chrome'
    },

    framework: 'cucumber',
    cucumberOpts: {
        require: 'cucumber/step_definitions/*.js',
        tags: ['~@wip', '~@ignore'],
        format: 'progress'
    }
};
