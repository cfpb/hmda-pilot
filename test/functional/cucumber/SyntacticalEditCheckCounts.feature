#https://github.com/cfpb/hmda-pilot/issues/29

@editCheck
Feature: User can view a loan-level report of the syntactical/validity edits
    As a user
    I want to be able to see an electronic report of the edits that have failed at the loan ID level
    So I can fix the data on my system at the loan level or comment on why the failure existed

Scenario Outline: Verifying syntactical edits
    Given that I am at the HMDA homepage
    When I click the localDB storage option
    And I upload the '<testfile>' file for validation
    And I click the submit button
    And I continue to the syntactical and validity edit reports page
    Then I can verify that the number of '<editname>' edit errors is '<errorcount>'
    Examples:
      | testfile             | editname   | errorcount |
      | syntactical/S013.dat | S013       | 1          |
      | syntactical/S025.dat | S025       | 1          |
      | syntactical/S028.dat | S028       | 1          |
      | syntactical/S040.dat | S040       | 4          |
      | syntactical/S100.dat | S100       | 1          |
      | syntactical/S205.dat | S205       | 200        |
      | syntactical/S270.dat | S270       | 200        |      
      | syntactical/S010.dat | S010       | 1          |
      | syntactical/S020.dat | S020       | 1          |