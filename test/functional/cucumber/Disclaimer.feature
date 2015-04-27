#https://github.com/cfpb/hmda-pilot/issues/186
#TODO: Consider combining with other basic UI features. Change to outline, and test multiple pages

Feature: Display a disclaimer on each page
    As CFPB
    We want to display a disclaimer that the application is a prototype
    So that testers do not think that they can submit their HMDA file via the pilot

  Scenario: Disclaimer on homepage
    Given that I am at the HMDA homepage
    Then I will see a disclaimer at the top
