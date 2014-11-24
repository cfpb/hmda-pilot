'use strict';

var AboutCtrl = require('../../../app/scripts/controllers/about');

describe('Controller: AboutCtrl', function () {

  var ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(function () {
    scope = {};
    ctrl = new AboutCtrl(scope);
  });

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
