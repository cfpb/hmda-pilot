# Developer Documentation

The HMDA Pilot is made up of 4 separate GitHub repositories:

 * [cfpb/hmda-pilot](https://github.com/cfpb/hmda-pilot) - Contains the code for the the UI which is written in AngularJS 1.3.
 * [cfpb/hmda-rule-spec](https://github.com/cfpb/hmda-rule-spec) - A JSON interpretation of FFIEC's [HMDA .DAT file format](http://www.ffiec.gov/hmda/fileformats.htm) and [validation edits](http://www.ffiec.gov/hmda/edits.htm).
 * [cfpb/hmda-rule-engine](https://github.com/cfpb/hmda-rule-engine) - A custom rule engine driven by the hmda-rule-specs and written in [isomorphic JavaScript](http://isomorphic.net/javascript) so that it can be run via Node.js or in a browser via Browserify.
 * [cfpb/hmda-edit-check-api](https://github.com/cfpb/hmda-edit-check-api) - A RESTful API developed using [KrakenJS](http://krakenjs.com/) that provides responses to the data-driven validation edits. The Edit Check API also provides access to a per-LAR validation, see the section below for more information.

## HMDA Edit Check API

In addition to providing the HMDA Pilot application with validation of data backed checks, the API can also validate single LARs against individual or all supported edit types.

**Limitation:** Currently the API only supports validating a single LAR, so it can not return errors against the transmital sheet or for edits that require elements of the transmittal sheet to be present.

### `isValidLar/:year`

Runs all applicable checks against the provided lar.

#### HTTP GET
```shell
$ curl -d "200010000529032991451676935000000000020130117111200122312013011736540311770501.01225    5    1200700   02.0021                                                                                                                                                                                                                                                                              " -H "Content-Type: text/plain" http://hmda-pilot.devis.com/api/isValidLar/2013
```

#### Response

```json
{
    "syntactical": {},
    "validity": {},
    "quality": {
        "Q032": {
            "description": "If action taken type = 1, then action taken date should not equal the date application received.",
            "explanation": "Loan is originated and action taken date = date application received; Verify.",
            "scope": "lar",
            "errors": [{
                "properties": {
                    "actionTaken": "1",
                    "actionDate": "20130117",
                    "applicationReceivedDate": "20130117"
                },
                "loanNumber": "0329914516769350000000000"
            }]
        }
    }
}
```

### `isValidLar/:year/:editType`

Runs all applicable checks for the supplied type against the provided LAR. Possible `editType` values include: `syntactical`, `validity` and `quality`.

#### HTTP GET
```shell
$ curl -d "200010000529111017852090299000000000020130117113100200312013011736540311770503.00225    5    12NA  0   NA   21                                                                                                                                                                                                                                                                              " -H "Content-Type: text/plain" http://hmda-pilot.devis.com/api/isValidLar/2013/quality
```

#### Response

```json
{
    "syntactical": {},
    "validity": {},
    "quality": {
        "Q032": {
            "description": "If action taken type = 1, then action taken date should not equal the date application received.",
            "explanation": "Loan is originated and action taken date = date application received; Verify.",
            "scope": "lar",
            "errors": [{
                "properties": {
                    "actionTaken": "1",
                    "actionDate": "20130117",
                    "applicationReceivedDate": "20130117"
                },
                "loanNumber": "1110178520902990000000000"
            }]
        },
        "Q027": {
            "description": "If action taken type = 1-5, 7 or 8, and property type = 1 or 2, then applicant income should not = NA.",
            "explanation": "Income = NA; Verify.",
            "scope": "lar",
            "errors": [{
                "properties": {
                    "actionTaken": "1",
                    "propertyType": "1",
                    "applicantIncome": "NA"
                },
                "loanNumber": "1110178520902990000000000"
            }]
        }
    }
}
```
