# Data Structures

This folder contains any data structures that are need by the UI and either should not, or not required to, be defined as lookups and served by the API.

## macro-comments.json
Contains an array of possible reasons a Macro edit might have been flagged as an error but is still valid.

**Example:**
```json
{
    "Q006": [
        "Large number of customers applied but had few loan closures",
        "A few out of a small number of loan applications did not close",
        "Large percentage of the few loan applications did not qualify for loan terms",
        "Purchased a lot of loans this year instead of originating them",
        "Large number of denied pre-approvals and applications this year"
    ],
}
```
