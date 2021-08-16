class Config {
  static get NODE_ENV() {
    return process.env.NODE_ENV;
  }

  static get IS_TEST_ENVIRONMENT() {
    return Boolean(process.env.REACT_APP_IS_TEST_ENVIRONMENT);
  }

  static get featureFlagExternalTicketSystemSupport() {
    return (
      process.env.REACT_APP_FEATURE_FLAG_EXTERNAL_TICKET_SYSTEM_SUPPORT ===
      'true'
    );
  }
}

export default Config;
