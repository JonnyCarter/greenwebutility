const RateChange = require('./src/aprc/RateChange');

// Create a RateChange instance
const rateChange = new RateChange(
    '2025-01-01', // Change Date
    3.0, // Previous Rate
    4.5, // New Rate
    1500.00 // Current Payment Amount
);

// Apply the rate change
const remainingPrincipal = 250000; // Remaining loan principal
const remainingTermMonths = 120; // Remaining term in months
const newPaymentAmount = rateChange.applyRateChange(remainingPrincipal, remainingTermMonths);

console.log(`New Payment Amount: $${newPaymentAmount.toFixed(2)}`);
