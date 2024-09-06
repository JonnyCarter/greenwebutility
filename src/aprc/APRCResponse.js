// APRCResponse.js
class APRCResponse {
    constructor(loanId, aprcValue, totalRepayment, monthlyPayment, feeSummary, rateChanges, success, errorMessage) {
        this.loanId = loanId;
        this.aprcValue = aprcValue;
        this.totalRepayment = totalRepayment;
        this.monthlyPayment = monthlyPayment;
        this.feeSummary = feeSummary; // Array of Fee instances
        this.rateChanges = rateChanges; // Array of RateChange instances
        this.success = success;
        this.errorMessage = errorMessage;
    }

    // Method to format the APRC response into a readable output
    formatResponse() {
        // TODO: Implement logic to format the APRCResponse object into a presentable format (e.g., for API response).
    }

    // Method to handle success or error
    handleResult(success, errorMessage = null) {
        // TODO: Implement logic to handle success or error conditions.
        this.success = success;
        if (!success) this.errorMessage = errorMessage;
    }
}

module.exports = APRCResponse;
