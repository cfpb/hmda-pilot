#https://github.com/cfpb/hmda-pilot/issues/155

Feature: Display edit validation steps using a wizard
    As a user
    I want to see the steps involved in validating my HMDA file
    So that I know what is coming next and can navigate backwards to any step in the wizard

  Scenario: Navigate from syntactical page
    Given that I am at the HMDA homepage
    When I click the localDB storage option
    And I upload the 'perfect.dat' file for validation
    And I click the submit button
    And I continue to the syntactical and validity edit reports page
    Then I see a navigation wizard
    And I can reset my session by clicking on the 'Select File' Tab

  Scenario: Navigate from quality page
    Given that I am at the HMDA homepage
    When I click the localDB storage option
    And I upload the 'perfect.dat' file for validation
    And I click the submit button
    And I continue to the quality and macro edit reports page
    Then I see a navigation wizard
    And I can navigate to the 'summarySyntacticalValidity' page by clicking the 'Syntactical & validity edit reports' Tab
    And I can reset my session by clicking on the 'Select File' Tab

  Scenario: Navigate from msa and irs page
    Given that I am at the HMDA homepage
    When I click the localDB storage option
    And I upload the 'perfect.dat' file for validation
    And I click the submit button
    And I continue to the msa and irs edit reports page
    Then I see a navigation wizard
    And I can navigate to the 'summaryQualityMacro' page by clicking the 'Quality & macro edit reports' Tab
    And I can navigate to the 'summarySyntacticalValidity' page by clicking the 'Syntactical & validity edit reports' Tab
    And I can reset my session by clicking on the 'Select File' Tab

  Scenario: Navigate from validation summary page
    Given that I am at the HMDA homepage
    When I click the localDB storage option
    And I upload the 'perfect.dat' file for validation
    And I click the submit button
    And I continue to the msa and irs edit reports page
    And I click on the 'IRS' report link
    And I verify the 'IRS' report and continue
    Then I see a navigation wizard
    And I can navigate to the 'summaryMSA-IRS' page by clicking the 'MSA and IRS reports' Tab
    And I can navigate to the 'summaryQualityMacro' page by clicking the 'Quality & macro edit reports' Tab
    And I can navigate to the 'summarySyntacticalValidity' page by clicking the 'Syntactical & validity edit reports' Tab
    And I can reset my session by clicking on the 'Select File' Tab
