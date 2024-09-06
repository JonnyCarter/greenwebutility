// LoanRequest.js
class LoanRequest {
    constructor(loanId, borrowerName, loanAmount, initialInterestRate, initialRateDurationYears, adjustedInterestRate, loanTermYears, repaymentFrequency, fees, startDate) {
        this.loanId = loanId;
        this.borrowerName = borrowerName;
        this.loanAmount = loanAmount;
        this.initialInterestRate = initialInterestRate;
        this.initialRateDurationYears = initialRateDurationYears;
        this.adjustedInterestRate = adjustedInterestRate;
        this.loanTermYears = loanTermYears;
        this.repaymentFrequency = repaymentFrequency;
        this.fees = fees; // Array of Fee instances
        this.startDate = startDate;
    }

    // Validate the loan request inputs
    validateInputs() {
        const invalidFields = [];
        let isValid = true;

        // Validate loan amount
        if (this.loanAmount <= 0) {
            invalidFields.push('loanAmount');
            isValid = false;
        }

        // Validate initial interest rate
        if (this.initialInterestRate < 0) {
            invalidFields.push('initialInterestRate');
            isValid = false;
        }

        // Validate initial rate duration
        if (this.initialRateDurationYears <= 0 || this.initialRateDurationYears > this.loanTermYears) {
            invalidFields.push('initialRateDurationYears');
            isValid = false;
        }

        // Validate adjusted interest rate
        if (this.adjustedInterestRate < 0) {
            invalidFields.push('adjustedInterestRate');
            isValid = false;
        }

        // Validate loan term
        if (this.loanTermYears <= 0) {
            invalidFields.push('loanTermYears');
            isValid = false;
        }

        // Validate repayment frequency
        const validFrequencies = ['monthly', 'quarterly', 'annually'];
        if (!validFrequencies.includes(this.repaymentFrequency)) {
            invalidFields.push('repaymentFrequency');
            isValid = false;
        }

        // Validate start date
        if (isNaN(this.startDate.getTime())) {
            invalidFields.push('startDate');
            isValid = false;
        }

        // Return validation result
        if (!isValid) {
            return {
                success: false,
                invalidFields: invalidFields
            };
        }
        return { success: true };
    }


    // Add additional methods for processing or transforming loan request data as needed.
}

module.exports = LoanRequest;
