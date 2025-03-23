const LoanRequest = require('../aprc/LoanRequest'); // Import the LoanRequest class

describe('LoanRequest Class', () => {

    let validLoanRequest;

    beforeEach(() => {
        validLoanRequest = new LoanRequest(
            "LN123",
            "John Doe",
            100000,  // Loan Amount
            5.0,  // Initial Interest Rate
            5,  // Initial Rate Duration (Years)
            6.5,  // Adjusted Interest Rate
            25,  // Loan Term (Years)
            "monthly",  // Repayment Frequency
            [],  // Fees (empty array for now)
            new Date("2024-01-01"),  // Start Date
            []  // Rate Changes
        );
    });

    test('should correctly initialize loan request properties', () => {
        expect(validLoanRequest.loanId).toBe("LN123");
        expect(validLoanRequest.borrowerName).toBe("John Doe");
        expect(validLoanRequest.loanAmount).toBe(100000);
        expect(validLoanRequest.initialInterestRate).toBe(5.0);
        expect(validLoanRequest.initialRateDurationYears).toBe(5);
        expect(validLoanRequest.adjustedInterestRate).toBe(6.5);
        expect(validLoanRequest.loanTermYears).toBe(25);
        expect(validLoanRequest.repaymentFrequency).toBe("monthly");
        expect(validLoanRequest.fees).toEqual([]);
        expect(validLoanRequest.startDate).toBeInstanceOf(Date);
        expect(validLoanRequest.rateChanges).toEqual([]);
    });

    test('should validate a correct loan request successfully', () => {
        const validation = validLoanRequest.validateInputs();
        expect(validation.success).toBe(true);
    });

    test('should detect invalid loan amount', () => {
        validLoanRequest.loanAmount = -50000;
        const validation = validLoanRequest.validateInputs();
        expect(validation.success).toBe(false);
        expect(validation.invalidFields).toContain('loanAmount');
    });

    test('should detect invalid initial interest rate', () => {
        validLoanRequest.initialInterestRate = -3;
        const validation = validLoanRequest.validateInputs();
        expect(validation.success).toBe(false);
        expect(validation.invalidFields).toContain('initialInterestRate');
    });

    test('should detect invalid initial rate duration years', () => {
        validLoanRequest.initialRateDurationYears = -1;
        const validation = validLoanRequest.validateInputs();
        expect(validation.success).toBe(false);
        expect(validation.invalidFields).toContain('initialRateDurationYears');
    });

    test('should detect adjusted interest rate less than 0', () => {
        validLoanRequest.adjustedInterestRate = -1;
        const validation = validLoanRequest.validateInputs();
        expect(validation.success).toBe(false);
        expect(validation.invalidFields).toContain('adjustedInterestRate');
    });

    test('should detect invalid loan term years', () => {
        validLoanRequest.loanTermYears = 0;
        const validation = validLoanRequest.validateInputs();
        expect(validation.success).toBe(false);
        expect(validation.invalidFields).toContain('loanTermYears');
    });

    test('should detect invalid repayment frequency', () => {
        validLoanRequest.repaymentFrequency = "weekly"; // Not in ["monthly", "quarterly", "annually"]
        const validation = validLoanRequest.validateInputs();
        expect(validation.success).toBe(false);
        expect(validation.invalidFields).toContain('repaymentFrequency');
    });

    test('should detect invalid start date', () => {
        validLoanRequest.startDate = new Date("invalid-date");
        const validation = validLoanRequest.validateInputs();
        expect(validation.success).toBe(false);
        expect(validation.invalidFields).toContain('startDate');
    });

});
