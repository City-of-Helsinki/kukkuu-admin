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
});
