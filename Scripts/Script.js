const RateChange = require('../src/aprc/RateChange');

// script.js

// Access command-line arguments
const args = process.argv.slice(2); // Skip the first two elements (node and script path)

// Ensure two arguments were passed
if (args.length !== 2) {
    console.error('Please provide exactly two inputs.');
    process.exit(1); // Exit with an error code
}

// Destructure the inputs
const [input1, input2] = args;

console.log(`Input 1 Remaining loan principal: ${input1}`);
console.log(`Input 2 Remaining term in months: ${input2}`);


// Create a RateChange instance
const rateChange = new RateChange(
    '2025-01-01', // Change Date
    3.0, // Previous Rate
    4.2, // New Rate
    1200.00 // Current Payment Amount
);

// Apply the rate change
const remainingPrincipal = input1; // Remaining loan principal
const remainingTermMonths = input2; // Remaining term in months
const newPaymentAmount = rateChange.applyRateChange(remainingPrincipal, remainingTermMonths);

console.log(`New Payment Amount: $${newPaymentAmount.toFixed(2)}`);



// Do something with the inputs
const result = `Concatenation of inputs: ${input1} ${input2}`;
console.log(result);