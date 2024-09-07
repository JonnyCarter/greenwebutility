// Import the readline module
const readline = require('readline');
const RateChange = require('../src/aprc/RateChange');

// Create an interface for reading input and writing output
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to prompt for user input
function askQuestion(query) {
    return new Promise(resolve => rl.question(query, answer => resolve(answer)));
}

(async function main() {
    try {
        // Ask for user inputs
        const input1 = await askQuestion("Input the Remaining loan principal: ");
        const input2 = await askQuestion("Input the Remaining term in months: ");
        const input3 = await askQuestion("Input the Previous Rate: ");
        const input4 = await askQuestion("Input the New Rate: ");
        const input5 = await askQuestion("Input the Current Payment Amount: ");

        const remainingPrincipal = input1; // Remaining loan principal
        const remainingTermMonths = input2; // Remaining term in months
        const previousRate = input3; // Remaining loan principal 2.4
        const newRate = input4; // Remaining term in months 3.4
        const currentPaymentAmount = input5; // Current payment amount 1200
        const rateChange = new RateChange(
            '2025-01-01', // Change Date
            newRate, // Previous Rate
            newRate, // New Rate
            currentPaymentAmount // Current Payment Amount
        );
        const newPaymentAmount = rateChange.applyRateChange(remainingPrincipal, remainingTermMonths);

        // Print a summary
        console.log(`New Payment Amount: £${newPaymentAmount.toFixed(2)}`);

    } catch (error) {
        console.error("Error reading input:", error);
    } finally {
        // Close the readline interface
        rl.close();
    }
})();
