#https://github.com/cfpb/hmda-pilot/issues/165
#TODO: Update when implemented

Feature: IRS report
    As a user
    I want to be able to view a report of the IRS information
    So that I can verify it before submitting

  Scenario: Can view IRS report
    Given that I am at the HMDA homepage
    When I click the localDB storage option
    And I upload the 'perfect.dat' file for validation
    And I click the submit button
    And I continue to the msa and irs edit reports page
    And I click on the 'IRS' report link
    Then I will see the 'IRS' report
    And I will see a certification of accuracy
