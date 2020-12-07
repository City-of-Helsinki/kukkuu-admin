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

  it('provides enableEventReadyTick', () => {
    delete process.env.REACT_APP_ENABLE_EVENT_READY_TICK;

    expect(Config.enableEventReadyTick).toBeFalsy();

    process.env.REACT_APP_ENABLE_EVENT_READY_TICK = 'true';

    expect(Config.enableEventReadyTick).toBeTruthy();
  });
});
