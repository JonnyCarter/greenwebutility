const APRCService = require('./APRCService');
const LoanRequest = require('./aprc/LoanRequest');
const Fee = require('./aprc/Fee');
const RateChange = require('./aprc/RateChange');
const APRCError = require('./aprc/Error');
const LoanDetails = require('./aprc/LoanDetails');
describe('APRCService', () => {
    let aprcService;

    beforeEach(() => {
        aprcService = new APRCService();
    });

    test('should calculate APRC for a valid loan request', () => {
        const fees = [
            new Fee('Arrangement Fee', 2000.00, 'one-time', true),
            new Fee('Other Fee', 2100.00, 'one-time', true),
        ];
        const loanRequest = new LoanRequest(
            '123e4567-e89b-12d3-a456-426614174000', 'John Doe', 250000.00, 1.99, 5, 4.50, 25, 'monthly', fees, new Date('2024-01-01')
        );
        const aprcResponse = aprcService.calculateAPRC(loanRequest);

        expect(aprcResponse).not.toBeNull();
        expect(aprcResponse.success).toBe(true);
        expect(parseFloat(aprcResponse.aprcValue)).toBeGreaterThan(0);
        expect(parseFloat(aprcResponse.aprcValue)).toBeLessThan(100);
        expect(parseFloat(aprcResponse.totalRepayment)).toBeGreaterThan(parseFloat(loanRequest.loanAmount));
        expect(parseFloat(aprcResponse.monthlyPayment)).toBeGreaterThan(0);
        expect(aprcResponse.rateChanges.length).toBe(0);
    });

    test('should return error for invalid loan request (negative loan amount)', () => {
        const fees = [
            new Fee('Arrangement Fee', 2000.00, 'one-time', true),
            new Fee('Other Fee', 2100.00, 'one-time', true),
        ];
        const loanRequest = new LoanRequest(
            '123e4567-e89b-12d3-a456-426614174000', 'John Doe', -250000.00, 1.99, 5, 4.50, 25, 'monthly', fees, new Date('2024-01-01')
        );
        const aprcResponse = aprcService.calculateAPRC(loanRequest);

        expect(aprcResponse.success).toBe(false);
        expect(aprcResponse.errorMessage.errorMessage).toBe('Invalid loan request data');
        expect(aprcResponse.errorMessage.errorCode).toBe('VALIDATION_ERROR');
    });

    test('should correctly handle step-rate loans', () => {
        const fees = [
            new Fee('Arrangement Fee', 2000.00, 'one-time', true),
            new Fee('Other Fee', 2100.00, 'one-time', true),
        ];
        const loanRequest = new LoanRequest(
            '123e4567-e89b-12d3-a456-426614174000', 'Jane Smith', 300000.00, 2.00, 3, 5.00, 30, 'monthly', fees, 
            new Date('2023-06-01'), [new RateChange(new Date('2026-06-01'), 2.00, 5.00, null)]
        );
        const aprcResponse = aprcService.calculateAPRC(loanRequest);

        expect(aprcResponse.success).toBe(true);
        expect(parseFloat(aprcResponse.aprcValue)).toBeGreaterThan(0);
        expect(parseFloat(aprcResponse.aprcValue)).toBeGreaterThan(loanRequest.initialInterestRate);
        expect(parseFloat(aprcResponse.aprcValue)).toBeLessThan(100);
        expect(aprcResponse.rateChanges.length).toBe(1);
        expect(aprcResponse.rateChanges[0].newRate).toBe(loanRequest.adjustedInterestRate);
    });

    // 🚀 NEW TEST CASES FOR IMPROVED COVERAGE 🚀

    test('should handle missing fees correctly', () => {
        const loanRequest = new LoanRequest(
            '456e7890-fgh1-34i5-j678-910klmno1123', 'Alice Brown', 200000.00, 3.00, 10, 6.00, 20, 'monthly', [], new Date('2025-01-01')
        );
        const aprcResponse = aprcService.calculateAPRC(loanRequest);

        expect(aprcResponse.success).toBe(true);
        expect(parseFloat(aprcResponse.aprcValue)).toBeGreaterThan(0);
    });

    test('should reject negative interest rates', () => {
        const loanRequest = new LoanRequest(
            '123e4567-e89b-12d3-a456-426614174000', 'John Doe', 250000.00, -1.99, 5, 4.50, 25, 'monthly', [], new Date('2024-01-01')
        );
        const aprcResponse = aprcService.calculateAPRC(loanRequest);

        expect(aprcResponse.success).toBe(false);
        expect(aprcResponse.errorMessage.invalidFields).toContain('initialInterestRate');
    });

    test('should reject rate change with invalid date', () => {
        const loanRequest = new LoanRequest(
            '789e1234-i56j-78k9-lmno-112233445566', 'Bob Martin', 250000.00, 3.5, 10, 5.5, 20, 'monthly', [], new Date('2025-01-01'),
            [new RateChange(new Date('2024-06-01'), 3.5, 5.5, null)] // Date before loan start!
        );
        const aprcResponse = aprcService.calculateAPRC(loanRequest);

        expect(aprcResponse.success).toBe(false);
        expect(aprcResponse.errorMessage.errorMessage).toContain('Invalid loan request data');
    });

    test('should handle extremely large loan amounts', () => {
        const loanRequest = new LoanRequest(
            '999e9999-zz99-88yy-77xx-555666777888', 'Big Corp', 10000000.00, 2.5, 15, 4.0, 35, 'monthly', [], new Date('2023-12-01')
        );
        const aprcResponse = aprcService.calculateAPRC(loanRequest);

        expect(aprcResponse.success).toBe(true);
        expect(parseFloat(aprcResponse.aprcValue)).toBeGreaterThan(0);
    });

    test('should reject rate change with missing required fields', () => {
        const loanRequest = new LoanRequest(
            '789e1234-i56j-78k9-lmno-112233445566', 'Bob Martin', 250000.00, 3.5, 10, 5.5, 20, 'monthly', [], new Date('2025-01-01'),
            [new RateChange(null, 3.5, 5.5, null)] // Invalid: missing changeDate
        );
        const aprcResponse = aprcService.calculateAPRC(loanRequest);
    
        expect(aprcResponse.success).toBe(false);
        expect(aprcResponse.errorMessage.errorMessage).toContain('Invalid loan request data');
    });
 
    test('should return error when nominalRate is negative', () => {
        expect(() => aprcService.calculateAPRCValue(-5, 500, 100000, 120000, 30, 'monthly'))
            .toThrow(APRCError); // Expect the custom error class
    });
    
    test('should return error when totalFees is negative', () => {
        expect(() => aprcService.calculateAPRCValue(5, -500, 100000, 120000, 30, 'monthly'))
            .toThrow(APRCError);
    });
    
    test('should return error when loanAmount is zero', () => {
        expect(() => aprcService.calculateAPRCValue(5, 500, 0, 120000, 30, 'monthly'))
            .toThrow(APRCError);
    });
    
    
    /*
    test('should correctly calculate APRC for a zero-interest loan', () => {
        const loanRequest = new LoanRequest(
            '0000-0000', 'Zero Interest Test', 50000.00, 0.00, 5, 0.00, 10, 'monthly', [], new Date('2025-01-01')
        );
    
        // Call `calculateMonthlyPayments()` first before APRC calculation
        const loanDetails = new LoanDetails(
            loanRequest.loanAmount,
            loanRequest.initialInterestRate,
            loanRequest.initialInterestRate,
            loanRequest.initialRateDurationYears,
            loanRequest.adjustedInterestRate,
            loanRequest.loanTermYears * 12, // Convert years to months
            null, null, 'monthly', 'monthly'
        );
    
        loanDetails.calculateMonthlyPayments(); // Ensure monthlyPayment is set
    
        const aprcResponse = aprcService.calculateAPRC(loanRequest);
    
        expect(aprcResponse.success).toBe(true);
        expect(parseFloat(aprcResponse.aprcValue)).toBeCloseTo(0, 1); // Expect near-zero APRC
    });
    */
    /*
    test('should correctly handle fees that are not included in APRC', () => {
        const fees = [
            new Fee('Processing Fee', 300.00, 'one-time', false), // Excluded fee
            new Fee('Origination Fee', 500.00, 'one-time', true) // Included fee
        ];
        const loanRequest = new LoanRequest(
            '9876-5432', 'Fee Test', 250000.00, 3.5, 5, 4.5, 20, 'monthly', fees, new Date('2024-01-01')
        );
        const aprcResponse = aprcService.calculateAPRC(loanRequest);
    
        expect(aprcResponse.success).toBe(true);
        expect(parseFloat(aprcResponse.aprcValue)).toBeGreaterThan(0);
    
        // Correct the property lookup:
        expect(aprcResponse.feeSummary.totalFees).toBeDefined();
        expect(aprcResponse.feeSummary.totalFees).toBe(500.00);
    });
    */
    
});
