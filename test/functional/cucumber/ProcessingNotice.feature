#https://github.com/cfpb/hmda-pilot/issues/178
#TODO: Consider combining with other basic UI features

@wip
Feature: Processing information warning while file is uploading
    As a user
    I want to know when a file is being processed
    So that I have more of an idea of what is going on

  Scenario: Upload file and see processing notice
    Given that I am at the HMDA homepage
    When I upload the 'V262short.dat'  file for validation
    Then the validation button will change to a processing button
