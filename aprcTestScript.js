const Error = require('./src/aprc/Error');
const Fee = require('./src/aprc/Fee');
const LoanRequest = require('./src/aprc/LoanRequest');
const APRCService = require('./src/APRCService');

// Test Error Class
const error = new Error('VALIDATION_ERROR', 'Invalid input fields', ['loanAmount', 'initialInterestRate']);
console.log('Testing Error Class:');
error.logError();
console.log('');

// Test Fee Class
const fee = new Fee('Processing Fee', 1000.00, 'one-time', true);
console.log('Testing Fee Class:');
console.log(fee);
console.log('');

// Test LoanRequest Class
const loanRequest = new LoanRequest(
    '12345',
    'Alice Doe',
    300000.00,
    2.5,
    5,
    4.5,
    30,
    'monthly',
    [fee],
    '2024-01-01'
);
console.log('Testing LoanRequest Class:');
console.log(loanRequest);
console.log('');

// Test APRCService Class
const aprcService = new APRCService();
const result = aprcService.calculateAPRC(loanRequest);
console.log('Testing APRCService Class:');
if (!result.success) {
    console.error('Failed to calculate APRC:', result.error);
} else {
    console.log('APRC Calculation Result:');
    console.log(`APRC Value: ${result.aprcValue}`);
    console.log(`Total Repayment: ${result.totalRepayment}`);
    console.log(`Monthly Payment: ${result.monthlyPayment}`);
}
