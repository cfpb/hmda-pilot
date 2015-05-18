#https://github.com/cfpb/hmda-pilot/issues/28

Feature: User can view a high-level report of the syntactical/validity edits
    As a user
    I want to be able to see an electronic report of the failures that have arrived at a high level
    So that I am able to get an overall view of how many syntactical/validity edits I have failed and where I need to look deeper to find the LARs I need to correct

  Scenario: Receive electronic report
    Given that I am at the HMDA homepage
    When I upload the 'V262short.dat' file for validation
    And I click the submit button
    And I continue to the syntactical and validity edit reports page
    Then I see an electronic report showing how many syntactical edits failed
    And I see an electronic report showing how many validity edits failed
