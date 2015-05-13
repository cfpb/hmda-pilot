#https://github.com/cfpb/hmda-pilot/issues/29

@editCheck
Feature: User can double-check edit error counts for quality edits
    As a user
    I want to be able to compare edit error counts generated using the SQL checker against the actual rule engine
    So I can ensure and maintain the correct application of the rules

Scenario Outline: Verifying quality edits
    Given that I am at the HMDA homepage
    When I click the localDB storage option
    And I upload the '<testfile>' file for validation
    And I click the submit button
    And I continue to the quality and macro edit reports page
    And I click on an '<editname>' edit failure section within the high level summary information
    Then I can verify that the number of quality edit errors is '<errorcount>'

    Examples:
      | testfile          | editname   | errorcount |
      | quality/Q020.dat  | Q020       | 1          |
      | quality/Q012.dat  | Q012       | 1          |
      | quality/Q130.dat  | Q130       | 1          |
      | quality/Q022.dat  | Q022       | 200        |
      | quality/Q035.dat  | Q035       | 200        |
      | quality/Q001.dat  | Q001       | 200        |
      | quality/Q002.dat  | Q002       | 200        |
      | quality/Q003.dat  | Q003       | 200        |
      | quality/Q004.dat  | Q004       | 200        |
      | quality/Q005.dat  | Q005       | 200        |
      | quality/Q013.dat  | Q013       | 200        |
      | quality/Q036.dat  | Q036       | 200        |
      | quality/Q037.dat  | Q037       | 200        |
      | quality/Q038.dat  | Q038       | 200        |
      | quality/Q025.dat  | Q025       | 200        |
      | quality/Q032.dat  | Q032       | 200        |
      | quality/Q026.dat  | Q026       | 200        |
      | quality/Q068.dat  | Q068       | 200        |
      | quality/Q014.dat  | Q014       | 200        |
      | quality/Q024.dat  | Q024       | 200        |
      | quality/Q027.dat  | Q027       | 200        |
      | quality/Q067.dat  | Q067       | 200        |
      | quality/Q039.dat  | Q039       | 200        |
      | quality/Q040.dat  | Q040       | 200        |
      | quality/Q066.dat  | Q066       | 200        |
      | quality/Q044.dat  | Q044       | 200        |
      | quality/Q045.dat  | Q045       | 200        |
      | quality/Q050.dat  | Q050       | 200        |
      | quality/Q051.dat  | Q051       | 200        |
      | quality/Q052.dat  | Q052       | 200        |
      | quality/Q064.dat  | Q064       | 200        |
      | quality/Q059.dat  | Q059       | 200        |