#https://github.com/cfpb/hmda-pilot/issues/20
#https://github.com/cfpb/hmda-pilot/issues/24

Feature: User can select a HMDA data file from their local machine
    As a user
    I want to select a HMDA file from my local machine and to be notified if the file I have select to edit check is not properly formatted
    So that I can know right away that I have selected the wrong data file or that my file is in the wrong format

  Scenario: Incorrectly formatted file
    Given that I am at the HMDA homepage
    When I upload the 'BadFile' file for validation
    And I click the submit button
    Then I am notified that the format is incorrect

  Scenario: Correctly formatted file
    Given that I am at the HMDA homepage
    When I upload the 'V262short.dat' file for validation
    And I click the submit button
    Then I am not notified that the format is incorrect
