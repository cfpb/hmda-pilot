# Commonly Asked Questions

## Table of Contents
* [What is "HMDA Pilot"?](#question-1)
* [What are the requirements for using the HMDA Pilot?](#question-21)
* [Where can I find the file format for the HMDA Dataset I would like to validate with the HMDA Pilot tool?](#question-2)
* [Which of the HMDA edits does the HMDA Pilot tool validate?](#question-3)
* [What does "Allow HMDA Pilot to store data locally" mean?](#question-4)
* [How can I delete the local storage when I am done validating my HMDA file?](#question-5)
* [When I click on "Start Validation", will my HMDA file be transmitted to the CFPB for processing?](#question-6)
* [How do I know that the edit validation is running on my file after I click "Start Validation"?](#question-7)
* [Why does the progress bar seem to stop at 100% when processing my HMDA file?](#question-8)
* [How do I cancel the edit validation processing if I realize that I need to start over or use another file?](#question-9)
* [How do I fix the data in my HMDA file that I am checking?](#question-10)
* [Why can't I skip ahead from Syntactical/Validity Edits to Quality Edits before fixing my Syntactical/Validity edit errors?](#question-11)
* [The continue button is greyed out on a step and I cannot move forward. What should I do?](#question-12)
* [Why do I need to recheck the full file and not just the Transmittal Sheet record or the LARs that I fixed?](#question-13)
* [How do I verify the quality and macro quality edits?](#question-14)
* [What do I do if the reason that the macro quality edit is appearing is not in the drop down?](#question-15)
* [Why did my quality and macro quality verifications reset when I started the process over?](#question-16)
* [I am on the MSA and IRS Reports step but I cannot see my IRS Report. Why?](#question-17)
* [I reached the validation summary but I cannot find a button to submit my data to the CFPB. How do I submit the clean data?](#question-18)
* [Where can I find out more information about the HMDA Process and my filing obligations?](#question-19)
* [As a software developer, where can I find more information what is going on behind the scenes with the HMDA Pilot?](#question-20)

## Commonly Asked Questions

1. <a id="question-1"></a>**What is "HMDA Pilot"?** <a id="question-1"></a>

 This HMDA Pilot is part of the [Consumer Financial Protection Bureau's](http://consumerfinance.gov/) (CFPB) work to improve the Home Mortgage Disclosure Act (HMDA) electronic reporting process for financial institutions. The CFPB is testing whether the HMDA Pilot application makes it easier for HMDA filers to review, validate and correct HMDA file submission edits. This site does not in any way alter or substitute your obligations for submitting data under HMDA. See [ffiec.gov/hmda](http://www.ffiec.gov/hmda/) for more details about your legal obligations.

1. <a id="question-21"></a>**What are the requirements for using the HMDA Pilot?**

  The HMDA Pilot requires that you process your data using one of the following browsers:

  * Firefox 33+
  * Google Chrome 36+
  * Internet Explorer 10 or 11

  In addition, because the HMDA Pilot is an application running within your browser, the following guidelines are suggested based on the number of LARs you are trying to validate.

  | Number of LARs | Browser type  | Store data locally |
  |----------------|---------------|--------------------|
  | Less than 1000 | 32- or 64-bit | Optional           |
  | 1000 to 20K    | 32- or 64-bit | Recommended        |
  | 20K to 50K     | 64-bit        | Recommended        |
  | 50K to 500K    | 64-bit        | Required           |
  | More than 500K | 64-bit        | See below          |

  To see if your browser is 32- or 64-bit, check your browser's *About* page.

  To validate more than 500K LARs, the processor and memory available to your browser may also be a factor.

1. <a id="question-2"></a>**Where can I find the file format for the HMDA Dataset I would like to validate with the HMDA Pilot tool?** 

 The HMDA Pilot tool will accept 2013 or 2014 [properly formatted HMDA .DAT files](http://www.ffiec.gov/hmda/fileformats.htm).

1. <a id="question-3"></a>**Which of the HMDA edits does the HMDA Pilot tool validate?**

 The HMDA Pilot tool will validate syntactical, validity, quality and macro quality edits as described in the [validation edits documentation](http://www.ffiec.gov/hmda/edits.htm) on the FFIEC website.

1. <a id="question-4"></a>**What does "Allow HMDA Pilot to store data locally" mean?**

 While the HMDA Pilot tool is running locally inside your browser it requires additional information from CFPB servers to perform certain tasks, such as determining valid values for Metropolitan Statistical Areas (MSAs). This back and forth network traffic can slow down the overall validation process. Local storage of these resources can speed up this process. Checking this option will download approximately 20 MB of census data to your browser, which will help reduce the edit validation processing time if you have 1,000 or more loans.  

1. <a id="question-5"></a>**How can I delete the local storage when I am done validating my HMDA file?**

 When you click "Start Over" or try to navigate away from the HMDA Pilot site, you will receive a message confirming that you would like to navigate back to the beginning of the process or to another website. Once you click ok to that confirmation message, the local storage will be removed from your browser.

1. <a id="question-6"></a>**When I click on "Start Validation", will my HMDA file be transmitted to the CFPB for processing?**

 The HMDA Pilot tool will not transmit your Transmittal Sheet or Loan/Application Registers (LARs) to the CFPB. The tool is meant to validate the edits within your system and in your browser, and the CFPB will not have a window into the data that you are using to perform the file validation. The system does not collect any data on your edits, changes or validations of HMDA data, nor does it actually collect any HMDA data.

1. <a id="question-7"></a>**How do I know that the edit validation is running on my file after I click "Start Validation"?**

 When you click on "Start Validation", a progress bar will appear to show that the syntactical and validity edits are running.

1. <a id="question-8"></a>**Why does the progress bar seem to stop at 100% when processing my HMDA file?**

 When the number of LARs present in your file is greater than the number specified in your transmittal sheet, the progress may appear to be stopped while the system processes the unexpected loans.

1. <a id="question-9"></a>**How do I cancel the edit validation processing if I realize that I need to start over or use another file?**

 If the progress bar appears on the screen when you would like to start the process over, you should click on the start over button. If you are viewing the edits or summary in either steps 2, 3, 4 or 5, you can click on the "Select file & validate" step to go back to the beginning of the process.

1. <a id="question-10"></a>**How do I fix the data in my HMDA file that I am checking?**

 You will need to change the underlying data that has caused the file to fail the edit in your system of record. Once you have fixed the data in your system of record, you should extract a new .DAT file and start the validation process over with the new .DAT file.

1. <a id="question-11"></a>**Why can't I skip ahead from Syntactical/Validity Edits to Quality Edits before fixing my Syntactical/Validity edit errors?**  

 Syntactical and validity edits mean that either the file is in the wrong format or you have a value in your data that should not exist. Until the file format or the data is corrected in your edit file, the quality and macro quality edits will not be accurate as they will be picking up the incorrect data.

1. <a id="question-12"></a>**The continue button is greyed out on a step and I cannot move forward. What should I do?** 

 You will need to review all of the edits that appear in the section in which you are located. If any of the edits say not verified, you will need to go into that edit and verify the information contained within the edit. Once you have verified all of the edits, the continue button should appear to allow you to move to the next section.

1. <a id="question-13"></a>**Why do I need to recheck the full file and not just the Transmittal Sheet record or the LARs that I fixed?** 

 Quality and macro edits run on the full file of data and so if you move beyond the syntactical and validity edits without your full HMDA file, you will not receive accurate results. To properly check the quality and macro edits, you need to validate a full file and not only the rows that were identified in a previous syntactical and validity check.

1. <a id="question-14"></a>**How do I verify the quality and macro quality edits?**

 You will need to check the information that appears on the individual quality and macro edits with your system of record and once you have verified that this information is correct, you should click the checkbox that you have verified the information. For macro quality edits, in addition to clicking the checkbox to show that you verified the information, you will need to pick a reason from the dropdown list provided.

1. <a id="question-15"></a>**What do I do if the reason that the macro quality edit is appearing is not in the drop down?** 

 If you do not see the reason for why a particular edit is appearing in the drop down for that particular edit, please note the issue on your HMDA Pilot testing questionnaire so we can research the issue.
 
1. <a id="question-16"></a>**Why did my quality and macro quality verifications reset when I started the process over?**

 Every time you select a file to validate, the system reruns the edits on that file. Therefore all of the data associated with a previously run edit is not saved.
 
1. <a id="question-17"></a>**I am on the MSA and IRS Reports step but I cannot see my IRS Report. Why?**

 The information in the Q029 and Q595 edit reports needs to be validated before the IRS report will appear. If any of the information contained in the Q029 or Q595 reports requires you to make a change to the Transmittal Sheet or the LAR, you will need to make the change in your system of record and revalidate the file. This is to prevent you from reviewing an IRS while errors still exist in the data.
 
1. <a id="question-18"></a>**I reached the validation summary but I cannot find a button to submit my data to the CFPB. How do I submit the clean data?** 

 We are not testing the submit function in the HMDA Pilot. Therefore there is no button to submit the data. We are interested in your process to obtain a clean file and your feedback on this process but are not expecting you to submit your data to CFPB for processing.
 
1. <a id="question-19"></a>**Where can I find out more information about the HMDA Process and my filing obligations?** 

 HMDA information can be found in several places. A link to the regulation can be found on the [CFPB regulation site](http://www.consumerfinance.gov/regulations/#ecfr). The [HMDA Reporting Getting it Right! Guide](http://www.ffiec.gov/hmda/guide.htm) is also a valuable resource for assisting institutions in their HMDA reporting. It includes a summary of responsibilities and requirements, directions for assembling the necessary tools, and instructions for reporting HMDA data.

1. <a id="question-20"></a>**As a software developer, where can I find more information what is going on behind the scenes with the HMDA Pilot?** 

 The [HMDA Pilot codebase](https://github.com/cfpb/hmda-pilot/) is open-source and is available via GitHub. Additional [developer documentation](https://github.com/cfpb/hmda-pilot/blob/master/DEVELOPERS.md) is also available.
