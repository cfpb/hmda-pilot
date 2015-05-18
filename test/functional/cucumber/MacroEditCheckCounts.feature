#https://github.com/cfpb/hmda-pilot/issues/29

@editCheck
Feature: User can double-check edit error counts for quality macro edits
    As a user
    I want to be able to compare edit error counts generated using the SQL checker against the actual rule engine
    So I can ensure and maintain the correct application of the rules

Scenario Outline: Verifying quality macro edits
    Given that I am at the HMDA homepage
    When I click the localDB storage option
    And I upload the '<testfile>' file for validation
    And I click the submit button
    And I continue to the quality and macro edit reports page
    And I click on an '<editname>' edit failure section within the high level summary information
    Then I can verify that the number of macro edit errors is '<errorvalue>'

    Examples:
     | testfile               | editname   | errorvalue | 
     | qualityMacro/Q015.dat  | Q015       | 89.94%     |
     | qualityMacro/Q006.dat  | Q006       | 98.02%     |
     | qualityMacro/Q007.dat  | Q007       | 90.40%     |
     | qualityMacro/Q008.dat  | Q008       | 89.40%     |
     | qualityMacro/Q009.dat  | Q009       | 88.00%     |
     | qualityMacro/Q010.dat  | Q010       | 5.60%      |
     | qualityMacro/Q011.dat  | Q011       | -96.78%    |
     | qualityMacro/Q016.dat  | Q016       | 90.80%     |
     | qualityMacro/Q023.dat  | Q023       | 91.20%     |
     | qualityMacro/Q031.dat  | Q031       | 450        |
     | qualityMacro/Q047.dat  | Q047       | 80.80%     |
     | qualityMacro/Q048.dat  | Q048       | 79.00%     |
     | qualityMacro/Q053.dat  | Q053       | 89.30%     |
     | qualityMacro/Q054.dat  | Q054       | 90.46%     |
     | qualityMacro/Q055.dat  | Q055       | 86.75%     |
     | qualityMacro/Q056.dat  | Q056       | 94.40%     |
     | qualityMacro/Q057.dat  | Q057       | 500        |
     | qualityMacro/Q058.dat  | Q058       | 0          |
     | qualityMacro/Q061.dat  | Q061       | 99.40%     |
     | qualityMacro/Q062.dat  | Q062       | 91.50%     |
     | qualityMacro/Q063.dat  | Q063       | 89.00%     |
     | qualityMacro/Q065.dat  | Q065       | 448        |
     | qualityMacro/Q075.dat  | Q075       | 45.99%     |
     | qualityMacro/Q080.dat  | Q080       | 89.80%     |
     | qualityMacro/Q081.dat  | Q081       | 90.80%     |
     | qualityMacro/Q082.dat  | Q082       | 90.60%     |
     | qualityMacro/Q083.dat  | Q083       | 71.60%     |