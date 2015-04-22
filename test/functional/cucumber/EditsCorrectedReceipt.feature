#https://github.com/cfpb/hmda-pilot/issues/25
#TODO: Update when this is actually implemented

@wip
Feature: User receives receipt confirming that all edits have been corrected
    As a user
    I want to view a confirmation page showing that the file has been error checked and that all the syntactical and validity errors have been corrected, all quality errors have been verified, and all errors requiring commentary have been commented
    So that I have proof that the edits were run and whether the edits passed or failed

  Scenario Outline: Correcting quality edits
    Given that I am at the HMDA homepage
    When I upload the '<testFile>' file for validation
    And I correct the errors
    And I click the 'View Receipt' button
    Then a receipt report is produced showing that the error tests have all been run and the status of those tests
    Examples:
        | testFile           |
        | 'quality/q001.dat' |
        | 'quality/q002.dat' |

  Scenario Outline: Correcting syntactical edits
    Given that I am at the HMDA homepage
    When I upload the '<testFile>' file for validation
    And I correct the errors
    And I click the 'View Receipt' button
    Then a receipt report is produced showing that the error tests have all been run and the status of those tests
    Examples:
        | testFile               |
        | 'syntactical/S010.dat' |
        | 'syntactical/S011.dat' |

  Scenario Outline: Correcting validity edits
    Given that I am at the HMDA homepage
    When I upload the '<testFile>' file for validation
    And I correct the errors
    And I click the 'View Receipt' button
    Then a receipt report is produced showing that the error tests have all been run and the status of those tests
    Examples:
        | testFile            |
        | 'validity/V105.dat' |
        | 'validity/V108.dat' |
