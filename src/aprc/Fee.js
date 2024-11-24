class Fee {
    constructor(Type, Amount, Frequency, IncludedInAPRC) {
        this.Type = Type;
        this.Amount = Amount;
        this.Frequency = Frequency;
        this.IncludedInAPRC = IncludedInAPRC;
    }
    isIncludedInAPRC() {
       return this.IncludedInAPRC && (this.Frequency === 'one-time' || this.Frequency === 'monthly'|| this.Frequency === 'annually');
    }
}
module.exports = Fee;
