#https://github.com/cfpb/hmda-pilot/issues/122
#https://github.com/cfpb/hmda-pilot/issues/165
#https://github.com/cfpb/hmda-pilot/issues/166

Feature: User has to provide verification for all quality errors, MSA, and Q029 edit errors
    As a user
    I want to verify all quality errors, MSA, and Q029 edit errors
    So that I have can submit my verified .dat file for completion

  Scenario: Confirming inability to complete without verification of quality edit errors
    Given that I am at the HMDA homepage
    When I upload the 'quality/Q001.dat' file for validation
    And I click the submit button
    And I continue to the quality and macro edit reports page
    Then I am unable to continue to the next page

  Scenario: Verifying quality edit errors
    Given that I am at the HMDA homepage
    When I upload the 'quality/Q001.dat' file for validation
    And I click the submit button
    And I continue to the quality and macro edit reports page
    And I correct all quality errors
    And I correct all macro errors
    Then I can continue to the next page

  Scenario: Verifying Q595 edit errors
    Given that I am at the HMDA homepage
    When I upload the 'Q595.dat' file for validation
    And I click the submit button
    And I continue through the quality macro errors page
    And I click on the 'Q595' report link
    And I correct all report errors
    Then I can continue to the IRS report

  Scenario: Verifying Q029 edit errors
    Given that I am at the HMDA homepage
    When I upload the 'Q029.dat' file for validation
    And I click the submit button
    And I continue to the msa and irs edit reports page
    And I click on the 'Q029' report link
    And I correct all report errors
    Then I can continue to the IRS report

  