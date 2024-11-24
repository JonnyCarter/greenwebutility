const APRCService = require('../src/APRCService'); // Assuming APRCService is in the same folder
const LoanRequest = require('../src/aprc/LoanRequest');
const Fee = require('../src/aprc/Fee');
const RateChange = require('../src/aprc/RateChange');

// Instantiate APRCService
const aprcService = new APRCService();


// Helper function to print the APRC result
function printAPRCResult(aprcResponse) {
    console.log("APRC Response:");
    console.log(JSON.stringify(aprcResponse, null, 2));
}

// Test case 1: Zero fees
function testZeroFees() {
    const fees = []
    const loanRequest = new LoanRequest(
        '123e4567-e89b-12d3-a456-426614174000', // loanId
        'John Doe',                              // borrowerName
        250000.00,                              // loanAmount 
        1.99,                                    // initialInterestRate
        5,                                       // initialRateDurationYears
        4.50,                                    // adjustedInterestRate
        25,                                      // loanTermYears
        'monthly',                               // repaymentFrequency
        fees, // fees array
        '2024-01-01'                             // startDate
    );

    const aprcResponse = aprcService.calculateAPRC(loanRequest);
    printAPRCResult(aprcResponse);
}

// Test case 2: Zero rate changes (fixed interest rate loan)
function testZeroRateChanges() {

    const fees = []
    fees.push(new Fee('origination', 1000.00, 'one-time', true));

    const loanRequest = new LoanRequest(
        '123e4567-e89b-12d3-a456-426614174000', // loanId
        'John Doe',                              // borrowerName
        300000.00,                              // loanAmount 
        4,                                    // initialInterestRate
        30,                                       // initialRateDurationYears
        4,                                    // adjustedInterestRate
        30,                                      // loanTermYears
        'monthly',                               // repaymentFrequency
        fees, // fees array
        '2024-01-01'                             // startDate
    );

    const aprcResponse = aprcService.calculateAPRC(loanRequest);
    printAPRCResult(aprcResponse);
}

// Test case 3: Very high interest rate
function testHighInterestRate() {
    const fees = []
    fees.push(new Fee('origination', 1000.00, 'one-time', true));

    const loanRequest = new LoanRequest(
        '123e4567-e89b-12d3-a456-426614174000', // loanId
        'John Doe',                              // borrowerName
        300000.00,                              // loanAmount 
        40,                                    // initialInterestRate
        30,                                       // initialRateDurationYears
        40,                                    // adjustedInterestRate
        30,                                      // loanTermYears
        'monthly',                               // repaymentFrequency
        fees, // fees array
        '2024-01-01'                             // startDate
    );

    const aprcResponse = aprcService.calculateAPRC(loanRequest);
    printAPRCResult(aprcResponse);
}

// Test case 4: Low interest rate
function testLowInterestRate() {
    const fees = []
    fees.push(new Fee('origination', 1000.00, 'one-time', true));
    const loanRequest = new LoanRequest(
        '123e4567-e89b-12d3-a456-426614174000', // loanId
        'John Doe',                              // borrowerName
        300000.00,                              // loanAmount 
        0.3,                                    // initialInterestRate
        30,                                       // initialRateDurationYears
        2,                                    // adjustedInterestRate
        30,                                      // loanTermYears
        'monthly',                               // repaymentFrequency
        fees, // fees array
        '2024-01-01'                             // startDate
    );

    const aprcResponse = aprcService.calculateAPRC(loanRequest);
    printAPRCResult(aprcResponse);
}

// Test case 5: Large fees
function testLargeFees() {
    const fees = []
    fees.push(new Fee('origination', 10000.00, 'one-time', true));
    fees.push(new Fee('Large 2', 20000.00, 'one-time', true));

    const loanRequest = new LoanRequest(
        '123e4567-e89b-12d3-a456-426614174000', // loanId
        'John Doe',                              // borrowerName
        300000.00,                              // loanAmount 
        0.2,                                    // initialInterestRate
        30,                                       // initialRateDurationYears
        2,                                    // adjustedInterestRate
        30,                                      // loanTermYears
        'monthly',                               // repaymentFrequency
        fees, // fees array
        '2024-01-01'                             // startDate
    );

    const aprcResponse = aprcService.calculateAPRC(loanRequest);
    printAPRCResult(aprcResponse);
}

// Test case 6: Zero interest rate - I dont want to support 0 interest rate mortgages
function testZeroInterestRate() {
    const fees = []
    fees.push(new Fee('origination', 10000.00, 'one-time', true));

    const loanRequest = new LoanRequest(
        '123e4567-e89b-12d3-a456-426614174000',  // loanId
        'John Doe',                              // borrowerName
        300000.00,                               // loanAmount 
        0.1,                                     // initialInterestRate
        30,                                      // initialRateDurationYears
        0,                                       // adjustedInterestRate
        30,                                      // loanTermYears
        'monthly',                               // repaymentFrequency
        fees, // fees array
        '2024-01-01'                             // startDate
    );

    const aprcResponse = aprcService.calculateAPRC(loanRequest);
    printAPRCResult(aprcResponse);
}

// Run all tests
function runTests() {
    console.log('--- Running APRC Tests ---');
    testZeroFees();
    console.log('--------------------------');
    testZeroRateChanges();
    console.log('--------------------------');
    testHighInterestRate();
    console.log('--------------------------');
    testLowInterestRate();
    console.log('--------------------------');
    testLargeFees();
    console.log('--------------------------');
    testZeroInterestRate();
    console.log('--------------------------');
}

// Start tests
runTests();
