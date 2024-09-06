// Fee.js
class Fee {
    constructor(Type, Amount, Frequency, IncludedInAPRC) {
        this.Type = Type;
        this.Amount = Amount;
        this.Frequency = Frequency;
        this.IncludedInAPRC = IncludedInAPRC;
    }

    // Method to check if fee should be included in APRC calculation
    isIncludedInAPRC() {
       // Include fees that are mandatory and are one-time or recurring (monthly) fees
       return this.IncludedInAPRC && (this.Frequency === 'one-time' || this.Frequency === 'monthly'|| this.Frequency === 'annually');
    }
}

module.exports = Fee;
