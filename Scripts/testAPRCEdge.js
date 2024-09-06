const APRCService = require('../src/APRCService'); // Assuming APRCService is in the same folder
const LoanRequest = require('../src/aprc/LoanRequest');
const Fee = require('../src/aprc/Fee');
const RateChange = require('../src/aprc/RateChange');

// Instantiate APRCService
const aprcService = new APRCService();

function createLoanRequest({
    loanId,
    loanAmount,
    initialInterestRate,
    initialRateDurationYears,
    adjustedInterestRate,
    loanTermYears,
    fees = [],
    rateChanges = []
}) {
    return new LoanRequest(
        loanId,
        loanAmount,
        initialInterestRate,
        initialRateDurationYears,
        adjustedInterestRate,
        loanTermYears,
        fees,
        rateChanges
    );
}

// Helper function to print the APRC result
function printAPRCResult(aprcResponse) {
    console.log("APRC Response:");
    console.log(JSON.stringify(aprcResponse, null, 2));
}

// Test case 1: Zero fees
function testZeroFees() {
    const loanRequest = createLoanRequest({
        loanId: 'test1',
        loanAmount: 200000,
        initialInterestRate: 5, // 5% interest
        initialRateDurationYears: 5,
        adjustedInterestRate: 4, // 4% after 5 years
        loanTermYears: 30, // 30-year loan
        fees: [] // No fees
    });

    const aprcResponse = aprcService.calculateAPRC(loanRequest);
    printAPRCResult(aprcResponse);
}

// Test case 2: Zero rate changes (fixed interest rate loan)
function testZeroRateChanges() {
    const loanRequest = createLoanRequest({
        loanId: 'test2',
        loanAmount: 300000,
        initialInterestRate: 4, // 4% fixed interest
        initialRateDurationYears: 30, // No rate changes, 30-year fixed
        adjustedInterestRate: 4, // No adjustment
        loanTermYears: 30,
        fees: [
            new Fee('origination', 1000, true), // Origination fee included in APRC
        ],
        rateChanges: [] // No rate changes
    });

    const aprcResponse = aprcService.calculateAPRC(loanRequest);
    printAPRCResult(aprcResponse);
}

// Test case 3: Very high interest rate
function testHighInterestRate() {
    const loanRequest = createLoanRequest({
        loanId: 'test3',
        loanAmount: 100000,
        initialInterestRate: 20, // 20% interest
        initialRateDurationYears: 30,
        adjustedInterestRate: 20, // No adjustment
        loanTermYears: 30,
        fees: [
            new Fee('origination', 500, true), // Origination fee
        ],
        rateChanges: [] // No rate changes
    });

    const aprcResponse = aprcService.calculateAPRC(loanRequest);
    printAPRCResult(aprcResponse);
}

// Test case 4: Low interest rate
function testLowInterestRate() {
    const loanRequest = createLoanRequest({
        loanId: 'test4',
        loanAmount: 250000,
        initialInterestRate: 0.5, // 0.5% interest
        initialRateDurationYears: 30,
        adjustedInterestRate: 0.5, // No adjustment
        loanTermYears: 30,
        fees: [
            new Fee('processing', 300, true),
        ],
        rateChanges: [] // No rate changes
    });

    const aprcResponse = aprcService.calculateAPRC(loanRequest);
    printAPRCResult(aprcResponse);
}

// Test case 5: Large fees
function testLargeFees() {
    const loanRequest = createLoanRequest({
        loanId: 'test5',
        loanAmount: 500000,
        initialInterestRate: 3.5, // 3.5% interest
        initialRateDurationYears: 5,
        adjustedInterestRate: 4, // Adjust to 4% after 5 years
        loanTermYears: 30,
        fees: [
            new Fee('processing', 5000, true), // Large processing fee
            new Fee('service', 2000, true), // Large service fee
        ],
        rateChanges: [
            new RateChange('2026-01-01', 3.5, 4)
        ]
    });

    const aprcResponse = aprcService.calculateAPRC(loanRequest);
    printAPRCResult(aprcResponse);
}

// Test case 6: Zero interest rate
function testZeroInterestRate() {
    const loanRequest = createLoanRequest({
        loanId: 'test6',
        loanAmount: 150000,
        initialInterestRate: 0, // 0% interest
        initialRateDurationYears: 30,
        adjustedInterestRate: 0, // No adjustment
        loanTermYears: 30,
        fees: [
            new Fee('processing', 1000, true),
        ],
        rateChanges: [] // No rate changes
    });

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
