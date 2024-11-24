const APRCService = require('../src/APRCService');
const LoanRequest = require('../src/aprc/LoanRequest');
const Fee = require('../src/aprc/Fee');
const RateChange = require('../src/aprc/RateChange');

// Example fees and rate changes
const fees = [
    new Fee('Processing Fee', 1000.00, 'one-time', true),
    new Fee('Monthly Maintenance Fee', 10.00, 'monthly', true)
];
const rateChanges = [
    new RateChange('2025-01-01', 3.0, 4.5, null) // Example rate change
];

// Create a LoanRequest instance
const loanRequest = new LoanRequest(
    '12345',
    'Alice Doe',
    300000.00,
    2.5,
    5,
    4.0,
    30,
    'monthly',
    fees,
    '2024-01-01'
);

// Create an APRCService instance
const aprcService = new APRCService();

// Calculate APRC
const aprcResponse = aprcService.calculateAPRC(loanRequest);
console.log(aprcResponse);
