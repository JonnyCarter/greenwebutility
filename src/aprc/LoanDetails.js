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
    calculateMonthlyPayments() {
        const principal = this.loanAmount;
        const monthlyRate = this.initialInterestRate / 100 / 12;
        const numberOfPayments = this.loanTermMonths;
    
        if (monthlyRate === 0) { // ✅ Handle 0% interest case
            this.monthlyPayment = principal / numberOfPayments;
            return this.monthlyPayment;
        }
    
        const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) 
            / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        
        this.monthlyPayment = monthlyPayment;
        return monthlyPayment;
    }
    
    calculateTotalPayable() {
        if (!this.monthlyPayment) {
            throw new Error('Monthly payment must be calculated first.');
        }
        const totalPayable = this.monthlyPayment * this.loanTermMonths;
        this.totalPayable = totalPayable;
        return totalPayable;
        }
    calculateNominalRate() {
        const initialTermMonths = this.initialRateDurationYears * 12;
        const remainingTermMonths = this.loanTermMonths - initialTermMonths;
        const initialRate = this.initialInterestRate / 100;
        const adjustedRate = this.adjustedInterestRate / 100;
        const weightedNominalRate = ((initialRate * initialTermMonths) + (adjustedRate * remainingTermMonths)) / this.loanTermMonths;
        return weightedNominalRate * 100; // Convert to percentage
    }
}
module.exports = LoanDetails;
