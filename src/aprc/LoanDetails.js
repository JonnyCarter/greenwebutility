// LoanDetails.js
class LoanDetails {
    constructor(loanAmount, nominalRate, initialInterestRate, initialRateDurationYears, adjustedInterestRate, loanTermMonths, monthlyPayment, totalPayable, frequency, compoundingPeriod) {
        this.loanAmount = loanAmount;
        this.nominalRate = nominalRate;
        this.initialInterestRate = initialInterestRate;
        this.initialRateDurationYears = initialRateDurationYears;
        this.adjustedInterestRate = adjustedInterestRate;
        this.loanTermMonths = loanTermMonths;
        this.monthlyPayment = monthlyPayment;
        this.totalPayable = totalPayable;
        this.frequency = frequency;
        this.compoundingPeriod = compoundingPeriod;
    }

    // Method to calculate monthly payments based on rates and term
    calculateMonthlyPayments() {
        const principal = this.loanAmount;
        const monthlyRate = this.initialInterestRate / 100 / 12;
        const numberOfPayments = this.loanTermMonths;

        // Monthly payment formula (for fixed-rate period)
        const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

        // Update class property
        this.monthlyPayment = monthlyPayment;
        return monthlyPayment;
        }

    // Method to calculate total payable amount over the loan term
    calculateTotalPayable() {
        // TODO: Implement logic to calculate total payable amount over the full loan term.
    }

    // Method to calculate the weighted nominal interest rate over the entire term
    calculateNominalRate() {
        // TODO: Calculate the nominal rate considering the initial and adjusted interest rates.
    }
}

module.exports = LoanDetails;
