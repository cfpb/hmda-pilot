#https://github.com/cfpb/hmda-pilot/issues/166
#https://github.com/cfpb/hmda-pilot/issues/167
#TODO: Update when implemented. Split 166 and 167 if need be.

Feature: Q029 report
    As a user
    I want to be able to view a report of the Q029 report issues
    So that I can verify Q029 errors before submitting

  Scenario: Can view Q029 report
    Given that I am at the HMDA homepage
    When I upload the 'Q029.dat' file and submit
    And I continue to the msa and irs edit reports page
    And I click on the 'Q029' report link
    Then I will see the 'Q029' report
    And I will see a verification for all errors