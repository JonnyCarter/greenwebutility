const APRCService = require('./APRCService');
const LoanRequest = require('./aprc/LoanRequest');
const Fee = require('./aprc/Fee');

describe('APRCService', () => {
    let aprcService;

    beforeEach(() => {
        // Initialize the APRCService instance before each test
        aprcService = new APRCService();
    });

    test('should calculate APRC for a valid loan request', () => {
        // Create a valid loan request object
        const loanRequest = new LoanRequest(
            '123e4567-e89b-12d3-a456-426614174000', // loanId
            'John Doe',                              // borrowerName
            250000.00,                               // loanAmount
            1.99,                                    // initialInterestRate
            5,                                       // initialRateDurationYears
            4.50,                                    // adjustedInterestRate
            25,                                      // loanTermYears
            'monthly',                               // repaymentFrequency
            [                                        // fees array
                new Fee('Arrangement Fee', 2000.00, 'one-time', true)
            ],
            '2024-01-01'                             // startDate
        );

        // Call the calculateAPRC method on the APRCService instance
        const aprcResponse = aprcService.calculateAPRC(loanRequest);

        // Check that APRCResponse is not null and the calculation was successful
        expect(aprcResponse).not.toBeNull();
        expect(aprcResponse.success).toBe(true);

        // Check that the APRC value is within a reasonable range
        expect(aprcResponse.aprcValue).toBeGreaterThan(0);
        expect(aprcResponse.aprcValue).toBeLessThan(100);

        // Check the total repayment and monthly payment fields
        expect(aprcResponse.totalRepayment).toBeGreaterThan(loanRequest.loanAmount);
        expect(aprcResponse.monthlyPayment).toBeGreaterThan(0);

        // Check the rate change is processed correctly (if applicable)
        expect(aprcResponse.rateChanges.length).toBeGreaterThan(0);
    });

    test('should return error for invalid loan request', () => {
        // Create an invalid loan request object (e.g., negative loan amount)
        const loanRequest = new LoanRequest(
            '123e4567-e89b-12d3-a456-426614174000', // loanId
            'John Doe',                              // borrowerName
            -250000.00,                              // loanAmount (invalid)
            1.99,                                    // initialInterestRate
            5,                                       // initialRateDurationYears
            4.50,                                    // adjustedInterestRate
            25,                                      // loanTermYears
            'monthly',                               // repaymentFrequency
            [                                        // fees array
                new Fee('Arrangement Fee', 2000.00, 'one-time', true)
            ],
            '2024-01-01'                             // startDate
        );

        // Call the calculateAPRC method on the APRCService instance
        const aprcResponse = aprcService.calculateAPRC(loanRequest);

        // Check that the calculation failed
        expect(aprcResponse.success).toBe(false);

        // Check the error message
        expect(aprcResponse.errorMessage).toBe('Loan amount must be positive');
    });

    test('should correctly handle step-rate loans', () => {
        // Create a loan request with step-rate (initial low interest then higher)
        const loanRequest = new LoanRequest(
            '123e4567-e89b-12d3-a456-426614174000',
            'Jane Smith',
            300000.00,                               // loanAmount
            2.00,                                    // initialInterestRate (lower)
            3,                                       // initialRateDurationYears
            5.00,                                    // adjustedInterestRate (higher)
            30,                                      // loanTermYears
            'monthly',                               // repaymentFrequency
            [new Fee('Processing Fee', 1500.00, 'one-time', true)],
            '2023-06-01'                             // startDate
        );

        // Call the APRC calculation
        const aprcResponse = aprcService.calculateAPRC(loanRequest);

        // Ensure the APRC calculation succeeded
        expect(aprcResponse.success).toBe(true);

        // Check that the APRC reflects both the initial and adjusted interest rates
        expect(aprcResponse.aprcValue).toBeGreaterThan(0);
        expect(aprcResponse.aprcValue).toBeGreaterThan(loanRequest.initialInterestRate);
        expect(aprcResponse.aprcValue).toBeLessThan(loanRequest.adjustedInterestRate);

        // Check the monthly payments before and after the rate change
        expect(aprcResponse.rateChanges.length).toBe(1); // One rate change after 3 years
        const rateChange = aprcResponse.rateChanges[0];
        expect(rateChange.newRate).toBe(loanRequest.adjustedInterestRate);
    });
});
