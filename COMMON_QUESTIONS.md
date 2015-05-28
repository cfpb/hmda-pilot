# Commonly Asked Questions

## Table of Contents

* [General Questions](#general-questions)
    * [What is "HMDA Pilot"?](#what-is-hmda-pilot)
    * [What are the requirements for using the HMDA Pilot?](#what-are-the-requirements-for-using-the-hmda-pilot)
    * [Where can I find the file format for the HMDA Dataset I would like to validate with the HMDA Pilot tool?](#where-can-i-find-the-file-format-for-the-hmda-dataset-i-would-like-to-validate-with-the-hmda-pilot-tool)
    * [Where can I find out more information about the HMDA Process and my filing obligations?](#where-can-i-find-out-more-information-about-the-hmda-process-and-my-filing-obligations)
* [Technical Questions](#technical-questions)
    * [What does "Allow HMDA Pilot to store data locally" mean?](#what-does-allow-hmda-pilot-to-store-data-locally-mean)
    * [How can I delete the local storage when I am done validating my HMDA file?](#how-can-i-delete-the-local-storage-when-i-am-done-validating-my-hmda-file)
    * [As a software developer, where can I find more information what is going on behind the scenes with the HMDA Pilot?](#as-a-software-developer-where-can-i-find-more-information-what-is-going-on-behind-the-scenes-with-the-hmda-pilot)
* [Workflow Questions](#workflow-questions)
    * [Which of the HMDA edits does the HMDA Pilot tool validate?](#which-of-the-hmda-edits-does-the-hmda-pilot-tool-validate)
    * [When I click on "Start Validation", will my HMDA file be transmitted to the CFPB for processing?](#when-i-click-on-start-validation-will-my-hmda-file-be-transmitted-to-the-cfpb-for-processing)
    * [How do I know that the edit validation is running on my file after I click "Start Validation"?](#how-do-i-know-that-the-edit-validation-is-running-on-my-file-after-i-click-start-validation)
    * [Why does the progress bar seem to stop at 100% when processing my HMDA file?](#why-does-the-progress-bar-seem-to-stop-at-100-when-processing-my-hmda-file)
    * [How do I cancel the edit validation processing if I realize that I need to start over or use another file?](#how-do-i-cancel-the-edit-validation-processing-if-i-realize-that-i-need-to-start-over-or-use-another-file)
    * [How do I fix the data in my HMDA file that I am checking?](#how-do-i-fix-the-data-in-my-hmda-file-that-i-am-checking)
    * [Why can't I skip ahead from Syntactical/Validity Edits to Quality Edits before fixing my Syntactical/Validity edit errors?](#why-cant-i-skip-ahead-from-syntactical-validity-edits-to-quality-edits-before-fixing-my-syntactical-validity-edit-errors)
    * [The continue button is greyed out on a step and I cannot move forward. What should I do?](#the-continue-button-is-greyed-out-on-a-step-and-i-cannot-move-forward-what-should-i-do)
    * [Why do I need to recheck the full file and not just the Transmittal Sheet record or the LARs that I fixed?](#why-do-i-need-to-recheck-the-full-file-and-not-just-the-transmittal-sheet-record-or-the-lars-that-i-fixed)
    * [How do I verify the quality and macro quality edits?](#how-do-i-verify-the-quality-and-macro-quality-edits)
    * [What do I do if the reason that the macro quality edit is appearing is not in the drop down?](#what-do-i-do-if-the-reason-that-the-macro-quality-edit-is-appearing-is-not-in-the-drop-down)
    * [Why did my quality and macro quality verifications reset when I started the process over?](#why-did-my-quality-and-macro-quality-verifications-reset-when-i-started-the-process-over)
    * [I am on the MSA and IRS Reports step but I cannot see my IRS Report. Why?](#i-am-on-the-msa-and-irs-reports-step-but-i-cannot-see-my-irs-report-why)
    * [I reached the validation summary but I cannot find a button to submit my data to the CFPB. How do I submit the clean data?](#i-reached-the-validation-summary-but-i-cannot-find-a-button-to-submit-my-data-to-the-cfpb-how-do-i-submit-the-clean-data)

## General Questions

### What is "HMDA Pilot"?

This HMDA Pilot is part of the [Consumer Financial Protection Bureau's](http://consumerfinance.gov/) (CFPB) work to improve the Home Mortgage Disclosure Act (HMDA) electronic reporting process for financial institutions. The CFPB is testing whether the HMDA Pilot application makes it easier for HMDA filers to review, validate and correct HMDA file submission edits. This site does not in any way alter or substitute your obligations for submitting data under HMDA. See [ffiec.gov/hmda](http://www.ffiec.gov/hmda/) for more details about your legal obligations.

### What are the requirements for using the HMDA Pilot?

The HMDA Pilot requires that you process your data using one of the following browsers:

* Firefox 33+
* Google Chrome 35+
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

### Where can I find the file format for the HMDA Dataset I would like to validate with the HMDA Pilot tool? 

The HMDA Pilot tool will accept 2013 or 2014 [properly formatted HMDA .DAT files](http://www.ffiec.gov/hmda/fileformats.htm).

### Where can I find out more information about the HMDA Process and my filing obligations? 

HMDA information can be found in several places. A link to the regulation can be found on the [CFPB regulation site](http://www.consumerfinance.gov/regulations/#ecfr). The [HMDA Reporting Getting it Right! Guide](http://www.ffiec.gov/hmda/guide.htm) is also a valuable resource for assisting institutions in their HMDA reporting. It includes a summary of responsibilities and requirements, directions for assembling the necessary tools, and instructions for reporting HMDA data.

## Technical Questions

### What does "Allow HMDA Pilot to store data locally" mean?

While the HMDA Pilot tool is running locally inside your browser it requires additional information from CFPB servers to perform certain tasks, such as determining valid values for Metropolitan Statistical Areas (MSAs). This back and forth network traffic can slow down the overall validation process. Local storage of these resources can speed up this process. Checking this option will download approximately 20 MB of census data to your browser, which will help reduce the edit validation processing time if you have 1,000 or more loans.  

### How can I delete the local storage when I am done validating my HMDA file?

When you click "Start Over" or try to navigate away from the HMDA Pilot site, you will receive a message confirming that you would like to navigate back to the beginning of the process or to another website. Once you click ok to that confirmation message, the local storage will be removed from your browser.

### As a software developer, where can I find more information what is going on behind the scenes with the HMDA Pilot? 

The [HMDA Pilot codebase](https://github.com/cfpb/hmda-pilot/) is open-source and is available via GitHub. Additional [developer documentation](https://github.com/cfpb/hmda-pilot/blob/master/DEVELOPERS.md) is also available.

## Workflow Questions

### Which of the HMDA edits does the HMDA Pilot tool validate?

The HMDA Pilot tool will validate syntactical, validity, quality and macro quality edits as described in the [validation edits documentation](http://www.ffiec.gov/hmda/edits.htm) on the FFIEC website.

### When I click on "Start Validation", will my HMDA file be transmitted to the CFPB for processing?

The HMDA Pilot tool will not transmit your Transmittal Sheet or Loan/Application Registers (LARs) to the CFPB. The tool is meant to validate the edits within your system and in your browser, and the CFPB will not have a window into the data that you are using to perform the file validation. The system does not collect any data on your edits, changes or validations of HMDA data, nor does it actually collect any HMDA data.

### How do I know that the edit validation is running on my file after I click "Start Validation"?

When you click on "Start Validation", a progress bar will appear to show that the syntactical and validity edits are running.

### Why does the progress bar seem to stop at 100% when processing my HMDA file?

When the number of LARs present in your file is greater than the number specified in your transmittal sheet, the progress may appear to be stopped while the system processes the unexpected loans.

### How do I cancel the edit validation processing if I realize that I need to start over or use another file?

If the progress bar appears on the screen when you would like to start the process over, you should click on the start over button. If you are viewing the edits or summary in either steps 2, 3, 4 or 5, you can click on the "Select file & validate" step to go back to the beginning of the process.

### How do I fix the data in my HMDA file that I am checking?

You will need to change the underlying data that has caused the file to fail the edit in your system of record. Once you have fixed the data in your system of record, you should extract a new .DAT file and start the validation process over with the new .DAT file.

### Why can't I skip ahead from Syntactical/Validity Edits to Quality Edits before fixing my Syntactical/Validity edit errors?  

Syntactical and validity edits mean that either the file is in the wrong format or you have a value in your data that should not exist. Until the file format or the data is corrected in your edit file, the quality and macro quality edits will not be accurate as they will be picking up the incorrect data.

### The continue button is greyed out on a step and I cannot move forward. What should I do? 

You will need to review all of the edits that appear in the section in which you are located. If any of the edits say not verified, you will need to go into that edit and verify the information contained within the edit. Once you have verified all of the edits, the continue button should appear to allow you to move to the next section.

### Why do I need to recheck the full file and not just the Transmittal Sheet record or the LARs that I fixed? 

Quality and macro edits run on the full file of data and so if you move beyond the syntactical and validity edits without your full HMDA file, you will not receive accurate results. To properly check the quality and macro edits, you need to validate a full file and not only the rows that were identified in a previous syntactical and validity check.

### How do I verify the quality and macro quality edits?

You will need to check the information that appears on the individual quality and macro edits with your system of record and once you have verified that this information is correct, you should click the checkbox that you have verified the information. For macro quality edits, in addition to clicking the checkbox to show that you verified the information, you will need to pick a reason from the dropdown list provided.

### What do I do if the reason that the macro quality edit is appearing is not in the drop down? 

If you do not see the reason for why a particular edit is appearing in the drop down for that particular edit, please note the issue on your HMDA Pilot testing questionnaire so we can research the issue.
 
### Why did my quality and macro quality verifications reset when I started the process over?

Every time you select a file to validate, the system reruns the edits on that file. Therefore all of the data associated with a previously run edit is not saved.
 
### I am on the MSA and IRS Reports step but I cannot see my IRS Report. Why?

The information in the Q029 and Q595 edit reports needs to be validated before the IRS report will appear. If any of the information contained in the Q029 or Q595 reports requires you to make a change to the Transmittal Sheet or the LAR, you will need to make the change in your system of record and revalidate the file. This is to prevent you from reviewing an IRS while errors still exist in the data.
 
### I reached the validation summary but I cannot find a button to submit my data to the CFPB. How do I submit the clean data? 

We are not testing the submit function in the HMDA Pilot. Therefore there is no button to submit the data. We are interested in your process to obtain a clean file and your feedback on this process but are not expecting you to submit your data to CFPB for processing.
