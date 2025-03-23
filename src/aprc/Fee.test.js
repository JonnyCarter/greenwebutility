const Fee = require('../aprc/Fee');

describe('Fee Class', () => {

    test('should correctly initialize a Fee object', () => {
        const fee = new Fee('Arrangement Fee', 500.00, 'one-time', true);

        expect(fee.Type).toBe('Arrangement Fee');
        expect(fee.Amount).toBe(500.00);
        expect(fee.Frequency).toBe('one-time');
        expect(fee.IncludedInAPRC).toBe(true);
    });

    test('should return true for valid APRC-included fees (one-time, monthly, annually)', () => {
        const oneTimeFee = new Fee('Arrangement Fee', 500.00, 'one-time', true);
        expect(oneTimeFee.isIncludedInAPRC()).toBe(true);

        const monthlyFee = new Fee('Processing Fee', 50.00, 'monthly', true);
        expect(monthlyFee.isIncludedInAPRC()).toBe(true);

        const annualFee = new Fee('Yearly Maintenance', 120.00, 'annually', true);
        expect(annualFee.isIncludedInAPRC()).toBe(true);
    });

    test('should return false for fees that are not included in APRC', () => {
        const nonIncludedFee = new Fee('Optional Service Fee', 100.00, 'one-time', false);
        expect(nonIncludedFee.isIncludedInAPRC()).toBe(false);
    });

    test('should return false for invalid fee frequencies', () => {
        const weeklyFee = new Fee('Weekly Processing', 25.00, 'weekly', true);
        expect(weeklyFee.isIncludedInAPRC()).toBe(false);

        const dailyFee = new Fee('Daily Charge', 5.00, 'daily', true);
        expect(dailyFee.isIncludedInAPRC()).toBe(false);
    });

    test('should return false when IncludedInAPRC is false regardless of frequency', () => {
        const monthlyFeeNotIncluded = new Fee('Monthly Processing', 75.00, 'monthly', false);
        expect(monthlyFeeNotIncluded.isIncludedInAPRC()).toBe(false);

        const annualFeeNotIncluded = new Fee('Annual Charge', 200.00, 'annually', false);
        expect(annualFeeNotIncluded.isIncludedInAPRC()).toBe(false);
    });

});
