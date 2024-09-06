const { generateAprc } = require('./aprc');

describe('APRC', () => {
    it('should return true', () => {
      expect(generateAprc()).toBeTruthy();
    });
});
