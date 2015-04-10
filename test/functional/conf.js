exports.config = {

  framework: 'cucumber',

  //Pass --specs when running to try an individual test
  specs: [
    'cucumber/TestFramework.feature',
    'cucumber/FileUpload.feature',
    'cucumber/HighLevelSyntacticalEditReport.feature',
    'cucumber/HighLevelQualityMacroEditReport.feature',
    'cucumber/Disclaimer.feature',
  ],

  allScriptsTimeout: 30000,
  getPageTimeout: 30000,


  baseUrl: 'http://dev.hmda-pilot.ec2.devis.com/#/',

  browserName: 'firefox',

  cucumberOpts: {
    require: 'cucumber/step_definitions/*.js',
    format: 'summary'
  }
};
