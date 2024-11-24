class RateChange {
    constructor(changeDate, previousRate, newRate, paymentAmount) {
        this.changeDate = changeDate;
        this.previousRate = previousRate;
        this.newRate = newRate;
        this.paymentAmount = paymentAmount;
    }
    applyRateChange(remainingPrincipal, remainingTermMonths) {
        const monthlyRateOld = this.previousRate / 100 / 12;
        const monthlyRateNew = this.newRate / 100 / 12;
        const remainingPayments = remainingTermMonths; // Number of payments left
        const newPaymentAmount = remainingPrincipal * (monthlyRateNew * Math.pow(1 + monthlyRateNew, remainingPayments)) / (Math.pow(1 + monthlyRateNew, remainingPayments) - 1);
        this.paymentAmount = newPaymentAmount;
        return newPaymentAmount;
    }
}
module.exports = RateChange;
