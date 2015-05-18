#https://github.com/cfpb/hmda-pilot/issues/93

Feature: User can view a loan-level report of the syntactical/validity edits
    As a user
    I want to be able to see an electronic report of the failures that have failed at a high level
    so that I am able to get an overall view of how many quality/macro edits I have failed and where I need to look deeper to find the LARs I need to correct

  Scenario: Receive electronic report
    Given that I am at the HMDA homepage
    When I upload the '0001000052.dat' file for validation
    And I click the submit button
    And I continue to the quality and macro edit reports page
    Then I see an electronic report showing how many quality edits failed
    And I see an electronic report showing how many macro edits failed
