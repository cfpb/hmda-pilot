#https://github.com/cfpb/hmda-pilot/issues/166
#https://github.com/cfpb/hmda-pilot/issues/167
#TODO: Update when implemented. Split 166 and 167 if need be.

Feature: MSA report
    As a user
    I want to be able to view a report of the MSA/MD branch location issues
    So that I can verify MSA location before submitting

  Scenario: Can view MSA (Q595) report
    Given that I am at the HMDA homepage
    When I click the localDB storage option
    And I upload the 'Q595.dat' file for validation
    And I click the submit button
    And I continue through the quality macro errors page
    And I click on the 'Q595' report link
    Then I will see the 'Q595' report

  Scenario: Can view Q029 report
    Given that I am at the HMDA homepage
    When I click the localDB storage option
    And I upload the 'Q029.dat' file for validation
    And I click the submit button
    And I continue to the msa and irs edit reports page
    And I click on the 'Q029' report link
    Then I will see the 'Q029' report
    And I will see a verification for all errors