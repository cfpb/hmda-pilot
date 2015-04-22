#https://github.com/cfpb/hmda-pilot/issues/166
#https://github.com/cfpb/hmda-pilot/issues/167
#TODO: Update when implemented. Split 166 and 167 if need be.

@wip
Feature: MSA report
    As a user
    I want to be able to view a report of the MSA/MD branch location issues
    So that I can verify MSA location before submitting

  Scenario: Can view MSA report
    Given that I am at the HMDA homepage
    When I upload the 'perfect.dat' file for validation
    And I continue to the MSA and IRS page
    And I click on the 'MSA report' button
    Then I will see the MSA report
    And I will see the Q595 report or Q029 report, as appropriate
    And I will be able to verify accuracy of reported information
