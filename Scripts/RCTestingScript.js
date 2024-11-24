const RateChange = require('../src/aprc/RateChange');

// script.js

// Access command-line arguments
const args = process.argv.slice(2); // Skip the first two elements (node and script path)

// Ensure two arguments were passed
if (args.length !== 5) {
    console.error('Please provide exactly 5 inputs.');
    console.error('node scriptname.js 1000 24 4 5 1200');
    process.exit(1); // Exit with an error code
}

// Destructure the inputs
const [input1, input2, input3, input4, input5] = args;

console.log(`Input 1 Remaining loan principal: ${input1}`);
console.log(`Input 2 Remaining term in months: ${input2}`);
console.log(`Input 3 Previous Rate: ${input3}`);
console.log(`Input 4 New Rate: ${input4}`);
console.log(`Input 4 Current Payment Amount: ${input5}`);
// Create a RateChange instance
const previousRate = input3; // Remaining loan principal 2.4
const newRate = input4; // Remaining term in months 3.4
const currentPaymentAmount = input5; // Current payment amount 1200

const rateChange = new RateChange(
    '2025-01-01', // Change Date
    newRate, // Previous Rate
    newRate, // New Rate
    currentPaymentAmount // Current Payment Amount
);

// Apply the rate change
const remainingPrincipal = input1; // Remaining loan principal
const remainingTermMonths = input2; // Remaining term in months
const newPaymentAmount = rateChange.applyRateChange(remainingPrincipal, remainingTermMonths);

console.log(`New Payment Amount: $${newPaymentAmount.toFixed(2)}`);



// Do something with the inputs
const result = `Concatenation of inputs: ${input1} ${input2}`;
console.log(result);