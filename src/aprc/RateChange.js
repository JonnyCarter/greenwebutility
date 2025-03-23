class RateChange {
    constructor(changeDate, previousRate, newRate, paymentAmount) {
        this.changeDate = changeDate;
        this.previousRate = previousRate;
        this.newRate = newRate;
        this.paymentAmount = paymentAmount;
    }

    applyRateChange(remainingPrincipal, remainingTermMonths) {
        if (remainingTermMonths <= 0) {
            throw new Error("Remaining term must be greater than zero.");
        }
    
        if (this.previousRate < 0 || this.newRate < 0) {
            throw new Error("Interest rates cannot be negative.");
        }
    
        const monthlyRateNew = this.newRate / 100 / 12;
        const remainingPayments = remainingTermMonths; // Number of payments left
    
        // Prevent division by zero if monthlyRateNew is 0
        if (monthlyRateNew === 0) {
            return 0;
        }
    
        const newPaymentAmount =
            remainingPrincipal *
            (monthlyRateNew * Math.pow(1 + monthlyRateNew, remainingPayments)) /
            (Math.pow(1 + monthlyRateNew, remainingPayments) - 1);
    
        this.paymentAmount = newPaymentAmount;
        return newPaymentAmount;
    }
    

}
module.exports = RateChange;
