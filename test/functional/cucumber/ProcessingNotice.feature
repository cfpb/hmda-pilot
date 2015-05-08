#https://github.com/cfpb/hmda-pilot/issues/178
#https://github.com/cfpb/hmda-pilot/issues/321
#TODO: Consider combining with other basic UI features

Feature: Processing information warning while file is uploading
    As a user
    I want to know when a file is being processed
    So that I have more of an idea of what is going on

  Scenario: Upload file and see progress bar
    Given that I am at the HMDA homepage
    When I click the localDB storage option
    And I upload the 'V262short.dat' file for validation
    And I click the submit button
    Then a progress bar displaying that the system is processing the file is displayed

  Scenario: Start validation and prevent double submit
    Given that I am at the HMDA homepage
    When I upload the 'V262short.dat' file for validation
    And I click the submit button
    Then the submit button is disabled while the file I selected is processing
