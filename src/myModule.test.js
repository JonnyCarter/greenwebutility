// src/myModule.test.js

const { add ,helloNpm } = require('./myModule');

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
