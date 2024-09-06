// Fee.js
class Fee {
    constructor(feeType, feeAmount, feeFrequency, feeIncludedInAPRC) {
        this.feeType = feeType;
        this.feeAmount = feeAmount;
        this.feeFrequency = feeFrequency;
        this.feeIncludedInAPRC = feeIncludedInAPRC;
    }

    // Method to check if fee should be included in APRC calculation
    isIncludedInAPRC() {
       // Include fees that are mandatory and are one-time or recurring (monthly) fees
       return this.feeIncludedInAPRC && (this.feeFrequency === 'one-time' || this.typfeeFrequency === 'monthly'|| this.typfeeFrequency === 'annually');
    }
}

module.exports = Fee;
