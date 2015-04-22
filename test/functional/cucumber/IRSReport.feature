#https://github.com/cfpb/hmda-pilot/issues/165
#TODO: Update when implemented

@wip
Feature: IRS report
    As a user
    I want to be able to view a report of the IRS information
    So that I can verify it before submitting

  Scenario: Can view IRS report
    Given that I am at the HMDA homepage
    When I upload the 'perfect.dat' file for validation
    And I continue to the MSA and IRS page
    And I click on the 'IRS report' button
    Then I will see the IRS report
    And I will see a certification of IRS accuracy
