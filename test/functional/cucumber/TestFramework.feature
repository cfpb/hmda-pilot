Feature: Running Cucumber with Protractor
  As a user of Protractor
  I should be able to use Cucumber
  to run my E2E tests

  Scenario: Running Cucumber with Protractor
    Given I run Cucumber with Protractor
    Then it should still do normal tests
    Then it should expose the correct global variables
  
  Scenario: Works with HMDA
    Given that I am at the HMDA homepage
    Then the title should equal 'HMDA Pilot | CFPB'
 
