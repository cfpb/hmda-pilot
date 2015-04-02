exports.config = {

  framework: 'cucumber',

  specs: [
    'cucumber/*.feature'
  ],

  baseUrl: 'http://dev.hmda-pilot.ec2.devis.com/#/',

  browserName: 'firefox',

  cucumberOpts: {
    require: 'cucumber/stepDefinitions.js',
    format: 'summary'
  }
};
