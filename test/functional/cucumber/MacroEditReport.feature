#https://github.com/cfpb/hmda-pilot/issues/33
#TODO: How to access macro report? Currently not implemented?

@wip
Feature: Display quality edit report
    As a user
    I want to be able to view the macro edits that failed
    So when a macro edit fails, I am able to review the failed edits

  Scenario: Able to see macro edit report
    Given that I am at the HMDA homepage
    When I upload the 'quality/q001.dat' file for validation
    And I continue to the quality and macro edit reports page
    And I click the 'View Macro Edits' button
    Then I see a list of the failed macro edits
