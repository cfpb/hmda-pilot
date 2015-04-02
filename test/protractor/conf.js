exports.config = {

  framework: 'cucumber',

  specs: [
    'cucumber/*.feature'
  ],

  baseUrl: 'http://dev.hmda-pilot.ec2.devis.com/#/',

  browserName: 'firefox',

  cucumberOpts: {
    require: 'cucumber/step_definitions/*.js',
    format: 'summary'
  }
};
