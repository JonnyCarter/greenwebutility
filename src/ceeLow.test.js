const { Win, Lose, getOutcome, rollDice, rollDie } = require('./ceeLow');
describe('ceeLow function', () => {
  it('should return 4 5 6', () => {
    expect(Win()).toBe("4 5 6");
  });
  it('should return 1 2 3 ', () => {
    expect(Lose()).toBe("1 2 3");
  });
  it('should return 1 - 6 ', () => {
    expect(rollDie()).toBeGreaterThanOrEqual(0);
    expect(rollDie()).toBeLessThanOrEqual(6);
  });
  it('should return an array [1, 2, 3] ', () => {
    expect(rollDice()).toBeTruthy();
  });
  it('should return the value', () => {
    expect(getOutcome(rollDice())).toBeTruthy();
  });
});