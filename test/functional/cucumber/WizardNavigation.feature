#https://github.com/cfpb/hmda-pilot/issues/155

@wip
Feature: Display edit validation steps using a wizard
    As a user
    I want to see the steps involved in validating my HMDA file
    So that I know what is coming next

  Scenario: Receive electronic report
    Given that I am at the HMDA homepage
    When I upload the 'quality/q001.dat' file for validation
    Then I see a navigation wizard
