// RateChange.js
class RateChange {
    constructor(changeDate, previousRate, newRate, paymentAmount) {
        this.changeDate = changeDate;
        this.previousRate = previousRate;
        this.newRate = newRate;
        this.paymentAmount = paymentAmount;
    }

    // Method to apply the new rate and recalculate payments
    applyRateChange(remainingPrincipal, remainingTermMonths) {
        const monthlyRateOld = this.previousRate / 100 / 12;
        const monthlyRateNew = this.newRate / 100 / 12;

        // Calculate remaining loan balance after applying the old rate
        // Formula for calculating loan balance:
        // Balance = P * [(1 + r)^n - (1 + r)^p] / [(1 + r)^n - 1]
        // where:
        // P = Payment Amount
        // r = Monthly Interest Rate
        // n = Total number of payments
        // p = Number of payments already made
        
        const remainingPayments = remainingTermMonths; // Number of payments left
        const newPaymentAmount = remainingPrincipal * (monthlyRateNew * Math.pow(1 + monthlyRateNew, remainingPayments)) / (Math.pow(1 + monthlyRateNew, remainingPayments) - 1);

        // Update payment amount
        this.paymentAmount = newPaymentAmount;
        return newPaymentAmount;
    }

}

module.exports = RateChange;
