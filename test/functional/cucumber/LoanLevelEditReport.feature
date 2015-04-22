#https://github.com/cfpb/hmda-pilot/issues/29
#TODO: Update language when steps are written, possibly test with more files.

@wip
Feature: User can view a loan-level report of the syntactical/validity edits
    As a user
    I want to be able to see an electronic report of the edits that have failed at the loan ID level
    So I can fix the data on my system at the loan level or comment on why the failure existed

  Scenario Outline: Receive electronic report
    Given that I am at the HMDA homepage
    When I upload the 'V262.dat' file for validation
    And I click on a section within the high level edit failure information
    Then I am able to see the <type> LAR at the loan ID level that failed in that section of the edits

    Examples:
    |  type                     |
    |  LAR number               |
    |  your submitted response  |
    |  edit identifier          |
    |  error explanation        |
    |  action                   |
