class Config {
  static get NODE_ENV() {
    return process.env.NODE_ENV;
  }

  static get enableEventReadyTick() {
    return process.env.REACT_APP_ENABLE_EVENT_READY_TICK;
  }
}

export default Config;
