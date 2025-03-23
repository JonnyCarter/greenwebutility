const LoanRequest = require('./aprc/LoanRequest');
const LoanDetails = require('./aprc/LoanDetails');
const APRCResponse = require('./aprc/APRCResponse');
const RateChange = require('./aprc/RateChange');
const Fee = require('./aprc/Fee');
const APRCError = require('./aprc/Error');

class APRCService {
    calculateAPRC(loanRequest) {
        // ✅ Validate loan request first
        const validationError = this.validateLoanInputs(loanRequest);
        if (validationError) {
            return this.createErrorResponse(loanRequest.loanId, validationError);
        }

        // ✅ Extract loan parameters
        const {
            loanAmount,
            initialInterestRate,
            initialRateDurationYears,
            adjustedInterestRate,
            loanTermYears,
            fees,
            rateChanges
        } = loanRequest;

        // ✅ Create loan details object
        const loanDetails = new LoanDetails(
            loanAmount, initialInterestRate, initialInterestRate,
            initialRateDurationYears, adjustedInterestRate,
            loanTermYears * 12, null, null, 'monthly', 'monthly'
        );

        // ✅ Ensure monthly payments are calculated before total payable
        loanDetails.monthlyPayment = loanDetails.calculateMonthlyPayments();
        loanDetails.totalPayable = loanDetails.calculateTotalPayable();

        // ✅ Process rate changes if applicable
        this.processRateChanges(rateChanges, loanRequest);

        // ✅ Summarize fees
        const feesSummary = this.summarizeFees(fees);

        // ✅ Compute APRC value
        const aprcValue = this.calculateAPRCValue(
            loanDetails.calculateNominalRate(),
            feesSummary.totalFees, loanAmount, loanDetails.totalPayable, 30, 'Annually'
        );

        // ✅ Return formatted response
        return new APRCResponse(
            loanRequest.loanId, aprcValue, loanDetails.totalPayable,
            loanDetails.monthlyPayment, feesSummary, rateChanges, true, null
        ).formatResponse();
    }

    /** 🛠 Private Methods for Cleaner Code **/
    
    /**
     * Validates loan inputs before APRC calculation
     */
    validateLoanInputs(loanRequest) {
        const invalidFields = [];
        let isValid = true;

        // 🛑 Ensure loan amount is valid
        if (loanRequest.loanAmount <= 0) {
            invalidFields.push('loanAmount');
            isValid = false;
        }

        // 🛑 Validate interest rates
        if (loanRequest.initialInterestRate < 0) {
            invalidFields.push('initialInterestRate');
            isValid = false;
        }
        if (loanRequest.adjustedInterestRate < 0) {
            invalidFields.push('adjustedInterestRate');
            isValid = false;
        }

        // 🛑 Validate rate change dates
        if (loanRequest.rateChanges && Array.isArray(loanRequest.rateChanges)) {
            loanRequest.rateChanges.forEach(change => {
                if (new Date(change.changeDate) < new Date(loanRequest.startDate)) {
                    invalidFields.push(`RateChange: ${change.changeDate} is before loan start date`);
                    isValid = false;
                }
            });
        }

        return isValid ? null : new APRCError('VALIDATION_ERROR', 'Invalid loan request data', invalidFields);
    }

    /**
     * Process rate changes for step-rate loans
     */
    processRateChanges(rateChanges, loanRequest) {
        if (!rateChanges || rateChanges.length === 0) return;

        rateChanges.forEach(change => {
            if (!change.changeDate || change.previousRate === undefined || change.newRate === undefined) {
                throw new APRCError('RATE_CHANGE_ERROR', 'Rate change data is incomplete.');
            }
            console.log(`Processing rate change on ${change.changeDate} from ${change.previousRate}% to ${change.newRate}%`);
        });
    }

    /**
     * Summarizes applicable fees
     */
    summarizeFees(fees) {
        if (!Array.isArray(fees)) fees = [];
        if (fees.length === 0) return { totalFees: 0, includedFees: [] };

        let totalFees = 0;
        let includedFees = fees.filter(fee => {
            if (fee.isIncludedInAPRC()) {
                totalFees += fee.Amount;
                return true;
            }
            return false;
        });

        return { totalFees, includedFees };
    }

    /**
     * Returns an error response object
     */
    createErrorResponse(loanId, error) {
        return new APRCResponse(
            loanId, null, null, null, null, null, false, error
        ).formatResponse();
    }

    /**
     * Computes the APRC value
     */
    calculateAPRCValue(nominalRate, totalFees, loanAmount, totalPayable, loanTermYears, paymentFrequency = 'monthly') {
        if (nominalRate < 0 || totalFees < 0 || loanAmount <= 0 || totalPayable < loanAmount || loanTermYears <= 0) {
            throw new APRCError('CALCULATION_ERROR', 'Invalid values for APRC calculation.');
        }

        let paymentsPerYear = { 'monthly': 12, 'quarterly': 4, 'annually': 1 }[paymentFrequency.toLowerCase()];
        if (!paymentsPerYear) throw new APRCError('INVALID_PAYMENT_FREQUENCY', 'Must be "monthly", "quarterly", or "annually".');

        const numberOfPayments = loanTermYears * paymentsPerYear;
        const periodicRate = nominalRate / 100 / paymentsPerYear;

        if (periodicRate === 0) {
            return ((totalPayable - loanAmount - totalFees) / loanAmount) * 100;
        }

        const periodicPayment = loanAmount * (periodicRate * Math.pow(1 + periodicRate, numberOfPayments)) 
            / (Math.pow(1 + periodicRate, numberOfPayments) - 1);

        return ((periodicPayment * numberOfPayments + totalFees - loanAmount) / loanAmount) * 100;
    }
}

module.exports = APRCService;
