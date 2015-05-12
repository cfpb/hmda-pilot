# About

This HMDA Pilot is part of the [Consumer Financial Protection Bureau's](http://consumerfinance.gov/) (CFPB) work to improve the Home Mortgage Disclosure Act (HMDA) electronic reporting process for financial institutions. This site does not in any way alter or substitute your obligations for submitting data under HMDA. See [ffiec.gov/hmda](http://www.ffiec.gov/hmda) for more details about your legal obligations.

This HMDA Pilot application makes it easier to review and validate HMDA file submission edits. Institutions can check their HMDA submission files or individual LAR records to determine if there are any syntactical, validity, quality or macro quality edit failures. The site gives institutions the ability to quickly fix any edit errors prior to submission.

During each step of the edit validation process, any errors must be fixed or verified before moving on to the next step. At the end of the process, you will be provided with a summary of the validated file. HMDA files are considered "clean" and ready to submit when there are no syntactical and validity edit errors and all quality, macro, MSA and IRS edit errors or reports have been verified.

## Validate a HMDA Dataset

It is important to note, that the HMDA Pilot has been designed so that the process of validating your HMDA dataset occurs entirely within your web browser. The .DAT file that you select in Step 1 below to validate is never submitted, transferred or stored anywhere other than in your computer's memory. Some edit validations require that specific information contained within the file be validated with external sources, and in that event, only the information required to validate the edit is submitted to our Application Program Interface (API).

### Step 1: Select File and Validate

On the Select File and Validate page, you will select your [properly formatted .DAT file](http://www.ffiec.gov/hmda/fileformats.htm) and filing year to the start the validation of the file. The system will then process your file and begin running the syntactical and validity [validation edits](http://www.ffiec.gov/hmda/edits.htm) on the file.

### Step 2: Syntactical and Validity Edit Reports

Syntactical and validity edit errors contain full file format or submission data errors. These edits have to be fixed prior to moving onto the next step. The errors can be viewed online, or downloaded as a CSV, to be fixed in the Financial Institution's system of record. A new file will then need to be validated via Step 1 until all syntactical and validity errors have been resolved.

### Step 3: Quality and Macro Edit Reports

Quality and macro quality edits occur when the HMDA data does not meet an expected standard. These edit errors could be for one individual loan/application register (LAR) record or for the full .DAT file. These errors only need to be corrected if the corresponding data is incorrect; otherwise, you must note that you have verified the data and in some circumstances, note the reason for why the discrepancy exists. As with Step 2, the errors can be viewed online, or downloaded as a CSV, to be fixed in the Financial Institution's system of record. A new file will then need to be validated via Step 1 until all syntactical and validity errors have been resolved and all quality and macro quality errors have been verified.

### Step 4: MSA and IRS Reports

The MSA reports, also known as Q029 and Q595, require you to review MSA/MD discrepancies and branch information and indicate your agreement with the information. These errors only need to be resolved if the corresponding data is incorrect, in which case you are required to fix this data in the Financial Institution's system of record and validate a new file via Step 1. 

The Institution Register Summary (IRS) will display when all syntactical, validity, quality, macro quality and MSA reports have been resolved and verified. You will be required to verify the information in the report reflects the submitted information. Should any discrepancies arise during the review, you are required to fix this data in the Financial Institution's system of record and validate a new file via Step 1.

### Step 5: Validation Summary

After steps 1-4 are complete and the edit errors have been resolved or verified, the Validation Summary will display and provide the Respondent and File information. This summary will signify that the file is "clean" and ready to file upon agreement with the summary. Once you have reached this screen, you have completed the HMDA Pilot validation.
