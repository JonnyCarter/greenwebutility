const APRCService = require('./APRCService');
const LoanRequest = require('./aprc/LoanRequest');
const Fee = require('./aprc/Fee');
const RateChange = require('./aprc/RateChange');
describe('APRCService', () => {
    let aprcService;
    beforeEach(() => {
        aprcService = new APRCService();
    });
    test('should calculate APRC for a valid loan request', () => {
        const fees = []
        fees.push(new Fee('Arrangement Fee', 2000.00, 'one-time', true));
        fees.push(new Fee('Other Fee', 2100.00, 'one-time', true));
        const loanRequest = new LoanRequest(
            '123e4567-e89b-12d3-a456-426614174000', // loanId
            'John Doe',                              // borrowerName
            250000.00,                               // loanAmount
            1.99,                                    // initialInterestRate
            5,                                       // initialRateDurationYears
            4.50,                                    // adjustedInterestRate
            25,                                      // loanTermYears
            'monthly',                               // repaymentFrequency
            fees, // fees array
            '2024-01-01'                             // startDate
        );
        const aprcResponse = aprcService.calculateAPRC(loanRequest);
        expect(aprcResponse).not.toBeNull();
        expect(aprcResponse.success).toBe(true);
        expect(parseFloat(aprcResponse.aprcValue)).toBeGreaterThan(0);
        expect(parseFloat(aprcResponse.aprcValue)).toBeLessThan(100);
        expect(parseFloat(aprcResponse.totalRepayment)).toBeGreaterThan(parseFloat(loanRequest.loanAmount));
        expect(parseFloat(aprcResponse.monthlyPayment)).toBeGreaterThan(0);
        expect(aprcResponse.rateChanges.length).toBe(0); // No rate changes for this example
    });
    test('should return error for invalid loan request', () => {
        const fees = []
        fees.push(new Fee('Arrangement Fee', 2000.00, 'one-time', true));
        fees.push(new Fee('Other Fee', 2100.00, 'one-time', true));
        const loanRequest = new LoanRequest(
            '123e4567-e89b-12d3-a456-426614174000', // loanId
            'John Doe',                              // borrowerName
            -250000.00,                              // loanAmount (invalid)
            1.99,                                    // initialInterestRate
            5,                                       // initialRateDurationYears
            4.50,                                    // adjustedInterestRate
            25,                                      // loanTermYears
            'monthly',                               // repaymentFrequency
            fees, // fees array
            '2024-01-01'                             // startDate
        );
        const aprcResponse = aprcService.calculateAPRC(loanRequest);
        expect(aprcResponse.success).toBe(false);
        expect(aprcResponse.errorMessage.errorMessage).toBe('Invalid loan request data');
        expect(aprcResponse.errorMessage.errorCode).toBe('VALIDATION_ERROR');
    });
    test('should correctly handle step-rate loans', () => {
        const fees = []
        fees.push(new Fee('Arrangement Fee', 2000.00, 'one-time', true));
        fees.push(new Fee('Other Fee', 2100.00, 'one-time', true));
        const loanRequest = new LoanRequest(
            '123e4567-e89b-12d3-a456-426614174000',
            'Jane Smith',
            300000.00,                               // loanAmount
            2.00,                                    // initialInterestRate (lower)
            3,                                       // initialRateDurationYears
            5.00,                                    // adjustedInterestRate (higher)
            30,                                      // loanTermYears
            'monthly',                               // repaymentFrequency
            fees, // fees array
            '2023-06-01',                            // startDate
            [new RateChange('2026-06-01', 2.00, 5.00, null)] // Example rate change
        );
        const aprcResponse = aprcService.calculateAPRC(loanRequest);
        expect(aprcResponse.success).toBe(true);
        expect(parseFloat(aprcResponse.aprcValue)).toBeGreaterThan(0);
        expect(parseFloat(aprcResponse.aprcValue)).toBeGreaterThan(loanRequest.initialInterestRate);
        expect(parseFloat(aprcResponse.aprcValue)).toBeLessThan(100);
        expect(aprcResponse.rateChanges.length).toBe(1); // One rate change after 3 years
        const rateChange = aprcResponse.rateChanges[0];
        expect(rateChange.newRate).toBe(loanRequest.adjustedInterestRate);
    });
});
