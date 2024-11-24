class LoanRequest {
    constructor(loanId, borrowerName, loanAmount, initialInterestRate, initialRateDurationYears, adjustedInterestRate, loanTermYears, repaymentFrequency, fees, startDate, rateChanges) {
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
        this.rateChanges = rateChanges;
    }
    validateInputs() {
        const invalidFields = [];
        let isValid = true;
        if (this.loanAmount <= 0) {
            invalidFields.push('loanAmount');
            isValid = false;
        }
        if (this.initialInterestRate < 0) {
            invalidFields.push('initialInterestRate');
            isValid = false;
        }
        if (this.initialRateDurationYears <= 0 || this.initialRateDurationYears > this.loanTermYears) {
            invalidFields.push('initialRateDurationYears');
            isValid = false;
        }
        if (this.adjustedInterestRate < 0) {
            invalidFields.push('adjustedInterestRate');
            isValid = false;
        }
        if (this.loanTermYears <= 0) {
            invalidFields.push('loanTermYears');
            isValid = false;
        }
        const validFrequencies = ['monthly', 'quarterly', 'annually'];
        if (!validFrequencies.includes(this.repaymentFrequency)) {
            invalidFields.push('repaymentFrequency');
            isValid = false;
        }
        if (isNaN(this.startDate.getTime())) {
            invalidFields.push('startDate');
            isValid = false;
        }
        if (!isValid) {
            return {
                success: false,
                invalidFields: invalidFields
            };
        }
        return { success: true };
    }
}
module.exports = LoanRequest;
