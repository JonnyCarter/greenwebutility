// APRCResponse.js
class APRCResponse {
    constructor(loanId, aprcValue, totalRepayment, monthlyPayment, feeSummary, rateChanges, success, errorMessage) {
        this.loanId = loanId;
        this.aprcValue = aprcValue;
        this.totalRepayment = totalRepayment;
        this.monthlyPayment = monthlyPayment;
        this.feeSummary = feeSummary || []; // Ensure feeSummary is an array
        this.rateChanges = rateChanges || []; // Ensure rateChanges is an array
        this.success = success; // Indicates whether the calculation was successful
        this.errorMessage = errorMessage; // Error message if success is false
    }

    // Method to format the APRC response into a readable output
    formatResponse() {
        if (this.success) {
            return {
                loanId: this.loanId,
                aprcValue: this.aprcValue.toFixed(2),
                totalRepayment: this.totalRepayment.toFixed(2),
                monthlyPayment: this.monthlyPayment.toFixed(2),
                feeSummary: this.formatFeeSummary(), // Call formatFeeSummary to format feeSummary
                rateChanges: this.formatRateChanges(), // Format rate changes if necessary
               
                success: this.success
            };
        } else {
            return {
                success: this.success,
                errorMessage: this.errorMessage
            };
        }
    }

     // Method to format the fee summary
     formatFeeSummary() {
        if (!Array.isArray(this.feeSummary)) {
            return []; // Return an empty array if feeSummary is not an array
        }

        return this.feeSummary.map(fee => ({
            name: fee.name,
            amount: fee.amount.toFixed(2),
            type: fee.type
        }));
    }

    // Method to format rate changes
    formatRateChanges() {
        if (!Array.isArray(this.rateChanges)) {
            return []; // Return an empty array if rateChanges is not an array
        }

        return this.rateChanges.map(change => ({
            changeDate: change.changeDate,
            previousRate: change.previousRate,
            newRate: change.newRate,
            paymentAmount: change.paymentAmount
        }));
    }

    // Method to handle success or error
    handleResult(success, errorMessage = null) {
        this.success = success;
        if (!success) this.errorMessage = errorMessage;
    }
}

module.exports = APRCResponse;
