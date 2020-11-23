import { sum } from '../utils';

describe('common utils', () => {
  describe('sum', () => {
    it('should add numbers together', () => {
      expect(sum([1, 4, 10])).toEqual(15);
    });
  });
});
