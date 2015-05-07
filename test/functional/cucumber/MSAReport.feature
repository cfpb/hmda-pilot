#https://github.com/cfpb/hmda-pilot/issues/166
#https://github.com/cfpb/hmda-pilot/issues/167
#TODO: Update when implemented. Split 166 and 167 if need be.

Feature: MSA report
    As a user
    I want to be able to view a report of the MSA/MD branch location issues
    So that I can verify MSA location before submitting

  Scenario: Can view MSA (Q595) report
    Given that I am at the HMDA homepage
    When I upload the 'Q595.dat' file and submit
    And I continue through the quality macro errors page
    And I click on the 'Q595' report link
    Then I will see the 'Q595' report