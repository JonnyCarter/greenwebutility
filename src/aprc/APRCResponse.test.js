const APRCResponse = require('../aprc/APRCResponse');

describe('APRCResponse Class', () => {

    test('should initialize with valid data', () => {
        const feeSummary = [
            { name: "Fee1", amount: 100.00, type: "one-time" },
            { name: "Fee2", amount: 200.50, type: "recurring" }
        ];
        const rateChanges = [
            { changeDate: "2026-06-01", previousRate: 2.0, newRate: 5.0, paymentAmount: 1500.00 }
        ];
        
        const response = new APRCResponse(
            "LN123", 4.75, 300000.00, 1250.00, feeSummary, rateChanges, true, null
        );

        expect(response.loanId).toBe("LN123");
        expect(response.aprcValue).toBe(4.75);
        expect(response.totalRepayment).toBe(300000.00);
        expect(response.monthlyPayment).toBe(1250.00);
        expect(response.feeSummary).toEqual(feeSummary);
        expect(response.rateChanges).toEqual(rateChanges);
        expect(response.success).toBe(true);
        expect(response.errorMessage).toBeNull();
    });

    test('should format response correctly when successful', () => {
        const feeSummary = [
            { name: "Fee1", amount: 100.00, type: "one-time" }
        ];
        const rateChanges = [
            { changeDate: "2026-06-01", previousRate: 2.0, newRate: 5.0, paymentAmount: 1500.00 }
        ];
        
        const response = new APRCResponse(
            "LN123", 4.756, 300000.99, 1250.45, feeSummary, rateChanges, true, null
        );

        const formatted = response.formatResponse();
        
        expect(formatted).toEqual({
            loanId: "LN123",
            aprcValue: "4.76",  // Should round to two decimal places
            totalRepayment: "300000.99",
            monthlyPayment: "1250.45",
            feeSummary: [{ name: "Fee1", amount: "100.00", type: "one-time" }],
            rateChanges: [
                { changeDate: "2026-06-01", previousRate: 2.0, newRate: 5.0, paymentAmount: 1500.00 }
            ],
            success: true
        });
    });

    test('should format response correctly when unsuccessful', () => {
        const response = new APRCResponse(
            "LN999", null, null, null, [], [], false, "Invalid loan request"
        );

        const formatted = response.formatResponse();

        expect(formatted).toEqual({
            success: false,
            errorMessage: "Invalid loan request"
        });
    });

    test('should handle missing feeSummary and rateChanges gracefully', () => {
        const response = new APRCResponse(
            "LN123", 3.50, 250000.00, 1100.00, null, null, true, null
        );

        expect(response.feeSummary).toEqual([]);  // Should default to an empty array
        expect(response.rateChanges).toEqual([]);  // Should default to an empty array
    });

    test('should format feeSummary correctly', () => {
        const feeSummary = [
            { name: "Fee1", amount: 100.00, type: "one-time" },
            { name: "Fee2", amount: 250.75, type: "recurring" }
        ];
        
        const response = new APRCResponse(
            "LN123", 4.00, 280000.00, 1150.00, feeSummary, [], true, null
        );

        expect(response.formatFeeSummary()).toEqual([
            { name: "Fee1", amount: "100.00", type: "one-time" },
            { name: "Fee2", amount: "250.75", type: "recurring" }
        ]);
    });

    test('should format rateChanges correctly', () => {
        const rateChanges = [
            { changeDate: "2026-06-01", previousRate: 2.5, newRate: 6.0, paymentAmount: 1600.00 },
            { changeDate: "2027-06-01", previousRate: 6.0, newRate: 7.5, paymentAmount: 1750.00 }
        ];
        
        const response = new APRCResponse(
            "LN123", 5.00, 300000.00, 1200.00, [], rateChanges, true, null
        );

        expect(response.formatRateChanges()).toEqual([
            { changeDate: "2026-06-01", previousRate: 2.5, newRate: 6.0, paymentAmount: 1600.00 },
            { changeDate: "2027-06-01", previousRate: 6.0, newRate: 7.5, paymentAmount: 1750.00 }
        ]);
    });

    test('Should return an empty array if rateChanes is not an array', () => {
        const response = new APRCResponse(
            "LN123", 5.00, 300000.00, 1200.00, {}, null, true, null
        );

        expect(response.formatRateChanges()).toEqual([]);
    });

    test('should correctly handle success flag updates', () => {
        const response = new APRCResponse("LN123", 4.5, 250000.00, 1100.00, [], [], true, null);

        response.handleResult(false, "APRC Calculation Failed");

        expect(response.success).toBe(false);
        expect(response.errorMessage).toBe("APRC Calculation Failed");
    });

    test('should correctly format response when success is false', () => {
        const response = new APRCResponse(
            "LN999", null, null, null, [], [], false, "Invalid loan request"
        );
    
        const formatted = response.formatResponse();
    
        expect(formatted).toEqual({
            success: false,
            errorMessage: "Invalid loan request"
        });
    });
    

});
