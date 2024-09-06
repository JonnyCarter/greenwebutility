# Green Web Utility greenwebutility


## Example Use
Install the module:

`npm i greenwebutility`
You can test its working as expected by creating a testing script with the following
// testScript.js
```
const { add, helloNpm } = require('greenwebutility');

// Test the 'add' function
console.log('Testing add function:');
console.log('Result of add(2, 3):', add(2, 3)); // Expected: 5
console.log('Result of add(-1, -2):', add(-1, -2)); // Expected: -3

// Test the 'helloNpm' function
console.log('\nTesting helloNpm function:');
console.log('Result of helloNpm():', helloNpm()); // Expected: 'Hello NPM!'
```
You can run the script and see the output
`node script.js` 

# APRC Service

## FCA Compliant APRC Service

The Financial Conduct Authority (FCA) in the United Kingdom specifies a mathematical formula for calculating the Annual Percentage Rate of Charge (APRC), which is used to represent the total cost of credit on an annual basis. The APRC includes not only the interest rate but also other charges associated with the loan, providing a comprehensive measure of the cost to the consumer.

[FCA Mathmatical Formula for APRC](https://www.handbook.fca.org.uk/handbook/MCOB/10A/2.html#DES11) 

The intention is to build a simple service for generating APRC values.

# Data Model Specification for APRC Calculation Service

### Entities:

1. **LoanRequest**
   - Represents the consumer's input for the APRC calculation.
   - Contains details about the loan, including principal amount, fees, and loan term.

2. **LoanDetails**
   - Captures the specific financial details of the loan.
   - Includes loan amount, interest rate, and frequency of payments.

3. **Fee**
   - Represents various types of fees associated with the loan (e.g., arrangement fees, administrative fees).
   - These fees are important for calculating the total cost of borrowing.

4. **APRCResponse**
   - Stores the calculated APRC along with additional insights.
   - Includes the final APRC percentage, repayment schedule, and total cost of borrowing.

5. **RateChange**
   - Tracks interest rate changes over the loan term.
   - Includes the previous and new interest rates and the new payment amount.

6. **Error**
   - Captures potential errors or validation issues during the APRC calculation process.


## Entity Details

### 1. LoanRequest

| Field                     | Type        | Description                                                      | Example                         |
|---------------------------|-------------|------------------------------------------------------------------|---------------------------------|
| loan_id                   | UUID        | Unique identifier for the loan request                           | `123e4567-e89b-12d3-a456-426614174000` |
| borrower_name             | String      | Name of the borrower                                              | `John Doe`                      |
| loan_amount               | Decimal     | Principal amount to be borrowed                                   | `250000.00`                     |
| initial_interest_rate      | Decimal     | Initial interest rate (applied for the initial period)            | `1.99`                          |
| initial_rate_duration_years| Integer     | Duration (in years) for which the initial rate applies            | `5`                             |
| adjusted_interest_rate     | Decimal     | Adjusted interest rate that applies after the initial period      | `4.50`                          |
| loan_term_years           | Integer     | Total duration of the loan term in years                          | `25`                            |
| repayment_frequency       | Enum        | Frequency of payments (monthly, quarterly, etc.)                  | `monthly`                       |
| fees                      | List<Fee>   | List of fees associated with the loan                             | See `Fee` entity                |
| start_date                | Date        | Start date of the loan                                            | `2024-01-01`                    |

### 2. LoanDetails

| Field                     | Type        | Description                                                      | Example                         |
|---------------------------|-------------|------------------------------------------------------------------|---------------------------------|
| loan_amount               | Decimal     | Total amount borrowed                                             | `250000.00`                     |
| nominal_rate              | Decimal     | Weighted average nominal interest rate over the term              | `3.85`                          |
| initial_interest_rate      | Decimal     | Initial interest rate applied for a specific period               | `1.99`                          |
| initial_rate_duration_years| Integer     | Duration (in years) for the initial rate                          | `5`                             |
| adjusted_interest_rate     | Decimal     | Interest rate after the initial period                            | `4.50`                          |
| loan_term_months          | Integer     | Duration of the loan term in months                               | `300` (for 25 years)            |
| monthly_payment           | Decimal     | Monthly payment amount                                            | `1200.00`                       |
| total_payable             | Decimal     | Total amount payable over the life of the loan                    | `375000.00`                     |
| frequency                 | Enum        | Payment frequency: monthly, quarterly, yearly                     | `monthly`                       |
| compounding_period        | Enum        | Compounding frequency (monthly, annually, etc.)                   | `monthly`                       |

### 3. Fee

| Field                     | Type        | Description                                                      | Example                         |
|---------------------------|-------------|------------------------------------------------------------------|---------------------------------|
| fee_type                  | String      | Description of the fee type (e.g., arrangement fee, admin fee)    | `Arrangement Fee`               |
| fee_amount                | Decimal     | Amount of the fee                                                 | `2000.00`                       |
| fee_frequency             | Enum        | How often the fee is charged (one-time, annually, monthly)        | `one-time`                      |
| fee_included_in_aprc      | Boolean     | Whether the fee is included in APRC calculation                   | `true`                          |

### 4. APRCResponse

| Field                     | Type        | Description                                                      | Example                         |
|---------------------------|-------------|------------------------------------------------------------------|---------------------------------|
| loan_id                   | UUID        | Unique identifier of the loan request                             | `123e4567-e89b-12d3-a456-426614174000` |
| aprc_value                | Decimal     | The calculated APRC, expressed as an annual percentage rate       | `3.85`                          |
| total_repayment           | Decimal     | Total repayment amount over the life of the loan                  | `375000.00`                     |
| monthly_payment           | Decimal     | Monthly payment required for the loan                             | `1200.00` (for first 5 years), `1400.00` (for remaining term) |
| fee_summary               | List<Fee>   | List of fees included in the APRC calculation                     | See `Fee` entity                |
| rate_changes              | List<RateChange>| List of rate changes over the loan period                       | See `RateChange` entity         |
| success                   | Boolean     | Indicates if the calculation was successful                       | `true`                          |
| error_message             | String      | Describes any errors encountered during the calculation           | `null`                          |

### 5. RateChange

| Field                     | Type        | Description                                                      | Example                         |
|---------------------------|-------------|------------------------------------------------------------------|---------------------------------|
| change_date               | Date        | Date when the interest rate changes                               | `2029-01-01`                    |
| previous_rate             | Decimal     | The interest rate before the change                               | `1.99`                          |
| new_rate                  | Decimal     | The new interest rate after the change                            | `4.50`                          |
| payment_amount            | Decimal     | The new payment amount after the rate change                      | `1400.00`                       |

### 6. Error

| Field                     | Type        | Description                                                      | Example                         |
|---------------------------|-------------|------------------------------------------------------------------|---------------------------------|
| error_code                | String      | A unique error code representing the specific issue               | `INVALID_INPUT`                 |
| error_message             | String      | Human-readable error description                                  | `Loan amount must be positive`  |
| invalid_fields            | List<String>| List of fields that caused the error                              | `loan_amount`                   |



## Key Modifications:
Initial and Adjusted Rates: We added fields for the initial low interest rate and the duration for which it applies, along with an adjusted interest rate that kicks in after that period.

RateChange Entity: The  RateChange entity tracks when the interest rate changes and what the new rate is. This is especially important for step-rate or adjustable-rate loans where the payment schedule will be affected.

APRCResponse Modifications: The response now includes details on the rate changes over the loan term, such as the dates when rates change and how payments are affected.

Monthly Payments with Multiple Rates: The monthly payment amount can now change over time as the interest rate changes. This allows for accurate repayment schedules over the full term of the loan.

## Example API Flow for a Step-Rate Loan
### 1. Request (LoanRequest):

```
{
  "borrower_name": "John Doe",
  "loan_amount": 250000.00,
  "initial_interest_rate": 1.99,
  "initial_rate_duration_years": 5,
  "adjusted_interest_rate": 4.50,
  "loan_term_years": 25,
  "repayment_frequency": "monthly",
  "fees": [
    {
      "fee_type": "Arrangement Fee",
      "fee_amount": 2000.00,
      "fee_frequency": "one-time",
      "fee_included_in_aprc": true
    }
  ],
  "start_date": "2024-01-01"
}
```

### 2. Response (APRCResponse):
json
```
{
  "loan_id": "123e4567-e89b-12d3-a456-426614174000",
  "aprc_value": 3.85,
  "total_repayment": 375000.00,
  "monthly_payment": 1200.00,  // for first 5 years
  "fee_summary": [
    {
      "fee_type": "Arrangement Fee",
      "fee_amount": 2000.00,
      "fee_frequency": "one-time",
      "fee_included_in_aprc": true
    }
  ],
  "rate_changes": [
    {
      "change_date": "2029-01-01",
      "previous_rate": 1.99,
      "new_rate": 4.50,
      "payment_amount": 1400.00
    }
  ],
  "success": true,
  "error_message": null
}
```

## Conclusion 
This  data model  supports loans that begin with a low interest rate and move to a higher rate after a fixed period. It tracks rate changes and adjusts payment schedules accordingly, providing an accurate APRC calculation for more complex loan structures such as step-rate loans.

