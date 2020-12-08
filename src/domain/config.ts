class Config {
  static get NODE_ENV() {
    return process.env.NODE_ENV;
  }

  static get enableEventReadyFeature() {
    return Boolean(process.env.REACT_APP_ENABLE_EVENT_READY_FEATURE);
  }
}

export default Config;
