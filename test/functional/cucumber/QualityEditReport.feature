#https://github.com/cfpb/hmda-pilot/issues/30
#TODO: Make sure that path to the report is right, add details, add AC for counts, details of an edit

@wip
Feature: Display quality edit report
    As a user
    I want to be able to view the quality edits that failed
    So when a quality edit fails, I am able to review the failed edits

  Scenario: Able to see quality edit report
    Given that I am at the HMDA homepage
    When I upload the 'quality/q001.dat' file for validation
    And I continue to the quality and macro edit reports page
    And I click the 'View Quality Edits' button
    Then I see a list of the failed quality edits
