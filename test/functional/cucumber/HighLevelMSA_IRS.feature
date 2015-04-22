#https://github.com/cfpb/hmda-pilot/issues/163
#TODO: Find best way to include longer description of what feature should do, maybe update 'So that'

@wip
Feature: High level summary of MSA and IRS reports
    As a user
    I want to be able to view a summary showing how many LARs have MSA/MD problems
    So that I know what needs to be fixed

  Scenario: Can view MSA/IRS summary
    Given that I am at the HMDA homepage
    When I upload the 'perfect.dat' file for validation
    And I continue to the MSA and IRS page
    Then I will see a high level summary of the MSA and IRS reports
