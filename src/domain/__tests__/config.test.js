import Config from '../config';

describe('Config', () => {
  let env = {};

  beforeEach(() => {
    env = process.env;
  });

  afterEach(() => {
    process.env = env;
  });

  it('provides node env', () => {
    process.env.NODE_ENV = 'production';

    expect(Config.NODE_ENV).toEqual('production');

    process.env.NODE_ENV = 'development';

    expect(Config.NODE_ENV).toEqual('development');
  });

  describe('IS_TEST_ENVIRONMENT', () => {
    afterEach(() => {
      delete process.env.VITE_IS_TEST_ENVIRONMENT;
    });

    it.each([
      ['1', true],
      ['true', true],
      ['0', false],
      ['false', false],
      ['', false],
    ])('parses %o as %o instead of coercing the string', (value, expected) => {
      process.env.VITE_IS_TEST_ENVIRONMENT = value;
      expect(Config.IS_TEST_ENVIRONMENT).toBe(expected);
    });

    it('defaults to false when unset', () => {
      expect(Config.IS_TEST_ENVIRONMENT).toBe(false);
    });
  });
});
