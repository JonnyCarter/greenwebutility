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
        // TODO: Implement logic to determine if the fee is included in APRC calculation.
    }
}

module.exports = Fee;
