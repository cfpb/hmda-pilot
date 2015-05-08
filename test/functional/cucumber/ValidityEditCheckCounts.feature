#https://github.com/cfpb/hmda-pilot/issues/29

@editCheck
Feature: User can double-check edit error counts for validity edits
    As a user
    I want to be able to compare edit error counts generated using the SQL checker against the actual rule engine
    So I can ensure and maintain the correct application of the rules

Scenario Outline: Verifying validity edits
    Given that I am at the HMDA homepage
    When I click the localDB storage option
    And I upload the '<testfile>' file for validation
    And I click the submit button
    And I continue to the syntactical and validity edit reports page
    Then I can verify that the number of '<editname>' edit errors is '<errorcount>'
    Examples:
      | testfile          | editname   | errorcount |
      | validity/V105.dat | V105       | 1          |
      | validity/V108.dat | V108       | 1          |
      | validity/V110.dat | V110       | 1          |
      | validity/V111.dat | V111       | 1          |
      | validity/V112.dat | V112       | 1          |
      | validity/V115.dat | V115       | 1          |
      | validity/V120.dat | V120       | 1          |
      | validity/V125.dat | V125       | 1          |
      | validity/V135.dat | V135       | 1          |
      | validity/V140.dat | V140       | 1          |
      | validity/V145.dat | V145       | 1          |
      | validity/V150.dat | V150       | 1          |
      | validity/V155.dat | V155       | 1          |
      | validity/V210.dat | V210       | 182        |
      | validity/V215.dat | V215       | 200        |
      | validity/V220.dat | V220       | 200        |
      | validity/V225.dat | V225       | 200        |
      | validity/V230.dat | V230       | 200        |
      | validity/V250.dat | V250       | 200        |
      | validity/V255.dat | V255       | 200        |
      | validity/V260.dat | V260       | 200        |
      | validity/V262.dat | V262       | 200        |
      | validity/V265.dat | V265       | 80         |
      | validity/V275.dat | V275       | 200        |
      | validity/V280.dat | V280       | 200        |
      | validity/V285.dat | V285       | 200        |
      | validity/V290.dat | V290       | 200        |
      | validity/V295.dat | V295       | 200        |
      | validity/V300.dat | V300       | 200        |
      | validity/V310.dat | V310       | 200        |
      | validity/V315.dat | V315       | 200        |
      | validity/V317.dat | V317       | 200        |
      | validity/V320.dat | V320       | 200        |
      | validity/V325.dat | V325       | 200        |
      | validity/V326.dat | V326       | 200        |
      | validity/V330.dat | V330       | 200        |
      | validity/V335.dat | V335       | 200        |