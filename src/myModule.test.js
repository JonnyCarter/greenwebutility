// src/myModule.test.js

const { add ,helloNpm,ceeLowDie, ceeLowWin,ceeLowLose,ceeLowOutcome  } = require('./myModule');

describe('add function', () => {
  it('should add two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('should add negative numbers', () => {
    expect(add(-1, -2)).toBe(-3);
  });
});

describe('hello function', () => {
  it('should return Hello World', () => {
    expect(helloNpm()).toBe("Hello NPM!");
  });

});

describe('ceeLowA dditions function', () => {
  //ceeLowDie, ceeLowWin,ceeLowLose,ceeLowOutcome
  it('Win', () => {
    expect(ceeLowWin()).toBe("4 5 6");
  });
  it('Lose', () => {
    expect(ceeLowLose()).toBe("1 2 3");
  });
  it('Dice', () => {
    expect(ceeLowDie()).toBeTruthy();
  });

});
