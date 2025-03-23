const RateChange = require('../aprc/RateChange'); // Import the RateChange class

describe('RateChange Class', () => {

    let validRateChange;

    beforeEach(() => {
        validRateChange = new RateChange(
            new Date("2026-06-01"), // Change Date
            2.0,  // Previous Rate (%)
            5.0,  // New Rate (%)
            0  // Initial Payment Amount (to be updated)
        );
    });

    test('should correctly initialize rate change properties', () => {
        expect(validRateChange.changeDate).toBeInstanceOf(Date);
        expect(validRateChange.previousRate).toBe(2.0);
        expect(validRateChange.newRate).toBe(5.0);
        expect(validRateChange.paymentAmount).toBe(0);
    });

    test('should calculate new payment amount after rate change', () => {
        const remainingPrincipal = 50000; // Loan balance remaining
        const remainingTermMonths = 240; // 20 years left

        const newPayment = validRateChange.applyRateChange(remainingPrincipal, remainingTermMonths);

        expect(newPayment).toBeGreaterThan(0);
        expect(validRateChange.paymentAmount).toBe(newPayment);
    });

    test('should handle zero remaining term gracefully', () => {
        const remainingPrincipal = 50000;
        const remainingTermMonths = 0; // No time left on the loan

        expect(() => validRateChange.applyRateChange(remainingPrincipal, remainingTermMonths)).toThrow();
    });

    test('should throw an error if previous or new rate is negative', () => {
        validRateChange.previousRate = -1;
        expect(() => validRateChange.applyRateChange(50000, 240)).toThrow();

        validRateChange.previousRate = 2.0;
        validRateChange.newRate = -3;
        expect(() => validRateChange.applyRateChange(50000, 240)).toThrow();
    });

    test('should return a valid new payment amount even with a zero principal', () => {
        const newPayment = validRateChange.applyRateChange(0, 240);
        expect(newPayment).toBe(0);
    });
});
