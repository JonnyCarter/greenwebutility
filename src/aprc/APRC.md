# APRC Calculator Service
This project provides a service to calculate the Annual Percentage Rate of Charge (APRC) for various types of loans. It includes several classes to model the loan structure, fees, rate changes, and more. The APRCService calculates the APRC based on user-provided loan data.
## Data Model
### LoanRequest
The LoanRequest class represents the essential details of a loan. It contains fields such as loan amount, interest rates, loan term, fees, and rate changes.
```
new LoanRequest(
    loanId,                     // Unique identifier for the loan (string)
    loanAmount,                 // Loan amount (number)
    initialInterestRate,        // Initial interest rate in percentage (number)
    initialRateDurationYears,   // Duration of the initial interest rate (years) (number)
    adjustedInterestRate,       // Adjusted interest rate after the initial duration (number)
    loanTermYears,              // Total loan term (years) (number)
    fees = [],                  // List of Fee objects (array)
    rateChanges = []            // List of RateChange objects (array)
)
```
---
### LoanDetails
The LoanDetails class is responsible for calculating loan-specific values, such as monthly payments, total payable amount, and nominal rate. This class is used internally by APRCService to compute these values.
```
new LoanDetails(
    loanAmount,                 // Loan amount (number)
    initialInterestRate,        // Initial interest rate in percentage (number)
    nominalRate,                // Nominal interest rate used for APRC calculation (number)
    initialRateDurationYears,   // Duration of initial rate (years) (number)
    adjustedInterestRate,       // Adjusted interest rate after initial rate period (number)
    loanTermMonths,             // Loan term in months (number)
    monthlyPayment = null,      // Monthly payment (calculated) (number)
    totalPayable = null,        // Total payable amount (calculated) (number)
    paymentFrequency = 'monthly',// Payment frequency (default: 'monthly')
    rateChangeFrequency = 'monthly'// Rate change frequency (default: 'monthly')
)
```
---
### Fee
The Fee class models any fees associated with the loan. Some fees are included in the APRC calculation.
```
new Fee(
    description,                // Description of the fee (string)
    amount,                     // Fee amount (number)
    isIncludedInAPRC            // Boolean flag whether the fee is included in APRC (boolean)
)
```
### RateChange
The RateChange class models changes to the interest rate that occur during the loan term (e.g., after an initial fixed-rate period).
```
new RateChange(
    changeDate,                 // Date when the rate changes (string or Date)
    previousRate,               // Previous interest rate before the change (number)
    newRate                     // New interest rate after the change (number)
)
```
---
### APRCService
The APRCService class handles the validation of loan input data and performs the APRC calculation. It takes in a LoanRequest and processes the necessary calculations.
#### Methods:
calculateAPRC(loanRequestData):
Main method to calculate APRC based on the provided LoanRequest object.
Example:
```
const aprcService = new APRCService();
const aprcResponse = aprcService.calculateAPRC(loanRequestData);
```
#### summarizeFees(fees):
Generates a summary of fees that are included in the APRC calculation.
#### validateLoanInputs(loanRequest):
Validates loan input data, checking if loan details are valid.
#### processRateChanges(loanRequest):
Processes the rate changes during the loan term.
### APRCResponse
The APRCResponse class represents the result of the APRC calculation. It includes the calculated APRC, total payable amount, monthly payments, and a breakdown of fees.
```
new APRCResponse(
    loanId,                     // Loan ID (string)
    aprcValue,                  // Calculated APRC value (number)
    totalPayable,               // Total payable amount (number)
    monthlyPayment,             // Monthly payment (number)
    feesSummary,                // Summary of included fees (object)
    rateChanges,                // Rate change details (array)
    success,                    // Boolean indicating if the calculation was successful (boolean)
    validationError = null      // Any validation errors (object, optional)
)
```
---
## Usage
### Step 1: Install dependencies
Run the following command to install the necessary dependencies:
`npm install`
### Step 2: Create a LoanRequest
Create a loan request object using the LoanRequest class and the details of your loan.
```
const LoanRequest = require('./aprc/LoanRequest');
const Fee = require('./aprc/Fee');
const RateChange = require('./aprc/RateChange');
const loanRequest = new LoanRequest(
    'loan123',                   // Loan ID
    200000,                      // Loan amount
    5,                           // Initial interest rate (5%)
    5,                           // Initial rate duration (5 years)
    4,                           // Adjusted interest rate (4%)
    30,                          // Loan term (30 years)
    [                            // List of fees
        new Fee('origination', 1000, true)
    ],
    [                            // List of rate changes
        new RateChange('2026-01-01', 5, 4)
    ]
);
```
### Step 3: Calculate APRC
Use the APRCService class to calculate the APRC for the created loan request.
```
const APRCService = require('./APRCService');
const aprcService = new APRCService();
const aprcResponse = aprcService.calculateAPRC(loanRequest);
console.log(aprcResponse);
```
### Step 4: Running Tests
To run the provided test cases:
`node tests/APRCService.test.js`
### Example Test Cases
The project includes test cases covering a variety of loan scenarios, including:
- Loans with zero fees
- Loans with fixed rates and rate changes
- Loans with high or low interest rates
- Loans with large fees
You can find these test cases in the tests/APRCService.test.js file.
### License
MIT License
