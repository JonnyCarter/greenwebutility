const LoanRequest = require('./aprc/LoanRequest');
const LoanDetails = require('./aprc/LoanDetails');
const APRCResponse = require('./aprc/APRCResponse');
const RateChange = require('./aprc/RateChange');
const Fee = require('./aprc/Fee');
const Error = require('./aprc/Error');
class APRCService {
    constructor() {
    }
    calculateAPRC(loanRequest) {
        const validationError = this.validateLoanInputs(loanRequest);
        if (validationError) {
            return new APRCResponse(
                loanRequest.loanId,
                null,
                null,
                null,
                null,
                null,
                false,
                validationError
            ).formatResponse();
        }
        const {
            loanAmount,
            initialInterestRate,
            initialRateDurationYears,
            adjustedInterestRate,
            loanTermYears,
            fees,
            rateChanges,
        } = loanRequest;
        const loanDetails = new LoanDetails(
            loanAmount,
            initialInterestRate,
            initialInterestRate,
            initialRateDurationYears,
            adjustedInterestRate,
            loanTermYears * 12, // Convert years to months
            null, // Monthly payment to be calculated
            null, // Total payable to be calculated
            'monthly',
            'monthly'
        );
        const monthlyPayment = loanDetails.calculateMonthlyPayments();
        const totalPayable = loanDetails.calculateTotalPayable();
        const nominalRate = loanDetails.calculateNominalRate();
        if (rateChanges && rateChanges.length > 0) {
            this.processRateChanges(loanRequest);
        }
        const feesSummary = this.summarizeFees(fees);
        const aprcValue = this.calculateAPRCValue(nominalRate, feesSummary.totalFees, loanAmount, totalPayable,30,'Annually');
        const aprcResponse = new APRCResponse(
            loanRequest.loanId,
            aprcValue,
            totalPayable,
            monthlyPayment,
            feesSummary,
            rateChanges,
            true,
            null
        );
        return aprcResponse.formatResponse();
    }
    processRateChanges(loanRequest) {
        const { rateChanges } = loanRequest;
        rateChanges.forEach(change => {
            console.log(`Processing rate change on ${change.changeDate} from ${change.previousRate}% to ${change.newRate}%`);
        });
    }
    validateLoanInputs(loanRequest) {
        const invalidFields = [];
        let isValid = true;
        if (loanRequest.loanAmount <= 0) {
            invalidFields.push('loanAmount');
            isValid = false;
        }
        if (loanRequest.initialInterestRate < 0) {
            invalidFields.push('initialInterestRate');
            isValid = false;
        }
        if (loanRequest.adjustedInterestRate < 0) {
            invalidFields.push('adjustedInterestRate');
            isValid = false;
        }
        if (!isValid) {
            return new Error(
                'VALIDATION_ERROR',
                'Invalid loan request data',
                invalidFields
            );
        }
        return null; // No errors
    }
    summarizeFees(fees) {
      if (!Array.isArray(fees)) {
        fees = [];
    }
    if (fees.length === 0) {
      return {
          totalFees: 0,
          includedFees: [], // Return an empty array if no fees are included
      };
  }
        let totalFees = 0;
        let includedFees = [];
        fees.forEach(fee => {
            if (fee.isIncludedInAPRC()) {
                totalFees += fee.Amount;
                includedFees.push(fee);
            }
        });
        return {
            totalFees: totalFees,
            includedFees: includedFees
        };
    }
calculateAPRCValue(nominalRate, totalFees, loanAmount, totalPayable, loanTermYears, paymentFrequency = 'monthly') {
  if (typeof nominalRate !== 'number' || isNaN(nominalRate) || nominalRate < 0) {
      throw new Error('Invalid nominalRate: Must be a non-negative number.');
  }
  if (typeof totalFees !== 'number' || isNaN(totalFees) || totalFees < 0) {
      throw new Error('Invalid totalFees: Must be a non-negative number.');
  }
  if (typeof loanAmount !== 'number' || isNaN(loanAmount) || loanAmount <= 0) {
      throw new Error('Invalid loanAmount: Must be a positive number greater than zero.');
  }
  if (typeof totalPayable !== 'number' || isNaN(totalPayable) || totalPayable < loanAmount) {
      throw new Error('Invalid totalPayable: Must be greater than or equal to loanAmount.');
  }
  if (typeof loanTermYears !== 'number' || isNaN(loanTermYears) || loanTermYears <= 0) {
      throw new Error('Invalid loanTermYears: Must be a positive number.');
  }
  let paymentsPerYear;
  switch (paymentFrequency.toLowerCase()) {
      case 'monthly':
          paymentsPerYear = 12;
          break;
      case 'quarterly':
          paymentsPerYear = 4;
          break;
      case 'annually':
          paymentsPerYear = 1;
          break;
      default:
          throw new Error('Invalid paymentFrequency: Must be "monthly", "quarterly", or "annually".');
  }
  const numberOfPayments = loanTermYears * paymentsPerYear;
  const periodicRate = nominalRate / 100 / paymentsPerYear;
  if (periodicRate === 0) {
      const aprcZeroRate = ((totalPayable - loanAmount - totalFees) / loanAmount) * 100;
      return aprcZeroRate;
  }
  const periodicPayment = loanAmount * (periodicRate * Math.pow(1 + periodicRate, numberOfPayments)) / (Math.pow(1 + periodicRate, numberOfPayments) - 1);
  const totalRepayment = periodicPayment * numberOfPayments;
  const totalCostOfCredit = totalRepayment + totalFees - loanAmount;
  const aprc = (totalCostOfCredit / loanAmount) * 100;
  return aprc;
}
}
module.exports = APRCService;
