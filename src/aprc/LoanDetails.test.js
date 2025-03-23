const LoanDetails = require('../aprc/LoanDetails');

describe('LoanDetails Class', () => {

    let validLoanDetails;

    beforeEach(() => {
        validLoanDetails = new LoanDetails(
            100000,  // Loan amount
            5.0,  // Nominal rate (not directly used in methods)
            3.5,  // Initial interest rate
            5,  // Initial rate duration (years)
            6.0,  // Adjusted interest rate
            240,  // Loan term (months)
            null,  // Monthly payment (calculated later)
            null,  // Total payable (calculated later)
            "monthly",  // Payment frequency
            "monthly"  // Compounding period
        );
    });

    test('should initialize with correct values', () => {
        expect(validLoanDetails.loanAmount).toBe(100000);
        expect(validLoanDetails.nominalRate).toBe(5.0);
        expect(validLoanDetails.initialInterestRate).toBe(3.5);
        expect(validLoanDetails.initialRateDurationYears).toBe(5);
        expect(validLoanDetails.adjustedInterestRate).toBe(6.0);
        expect(validLoanDetails.loanTermMonths).toBe(240);
        expect(validLoanDetails.frequency).toBe("monthly");
        expect(validLoanDetails.compoundingPeriod).toBe("monthly");
    });

    test('should correctly calculate monthly payments', () => {
        const monthlyPayment = validLoanDetails.calculateMonthlyPayments();

        expect(monthlyPayment).toBeGreaterThan(0);
        expect(validLoanDetails.monthlyPayment).toBe(monthlyPayment);
    });

    test('should correctly calculate total payable amount', () => {
        validLoanDetails.calculateMonthlyPayments();
        const totalPayable = validLoanDetails.calculateTotalPayable();

        expect(totalPayable).toBeGreaterThan(validLoanDetails.loanAmount);
        expect(validLoanDetails.totalPayable).toBe(totalPayable);
    });

    test('should throw an error when calculating total payable without calculating monthly payment first', () => {
        expect(() => validLoanDetails.calculateTotalPayable()).toThrow('Monthly payment must be calculated first.');
    });

    test('should correctly calculate nominal interest rate', () => {
        const nominalRate = validLoanDetails.calculateNominalRate();

        expect(nominalRate).toBeGreaterThan(0);
        expect(nominalRate).toBeCloseTo(5.375, 2); // Adjust expected value & allow 2 decimal precision
    });

    test('should handle very low interest rates', () => {
        validLoanDetails.initialInterestRate = 0.1;
        validLoanDetails.adjustedInterestRate = 0.2;

        const nominalRate = validLoanDetails.calculateNominalRate();
        expect(nominalRate).toBeGreaterThan(0);
    });

    test('should handle very high interest rates', () => {
        validLoanDetails.initialInterestRate = 15.0;
        validLoanDetails.adjustedInterestRate = 18.0;

        const nominalRate = validLoanDetails.calculateNominalRate();
        expect(nominalRate).toBeGreaterThan(10);
    });

    test('should handle short loan terms (12 months)', () => {
        validLoanDetails.loanTermMonths = 12;
        validLoanDetails.initialRateDurationYears = 1;
        
        const nominalRate = validLoanDetails.calculateNominalRate();
        expect(nominalRate).toBeGreaterThan(0);
    });

});
