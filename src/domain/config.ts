// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class Config {
  static readonly momentValidationDateTimeFormats = [
    'D.M.YYYY H:mm',
    'D.M.YYYY HH:mm',
    'DD.MM.YYYY H:mm',
    'DD.MM.YYYY HH:mm',
  ] as const;

  static get NODE_ENV() {
    return process.env.NODE_ENV;
  }

  static get IS_TEST_ENVIRONMENT() {
    return Boolean(import.meta.env.VITE_IS_TEST_ENVIRONMENT);
  }

  static get featureFlagExternalTicketSystemSupport() {
    return (
      import.meta.env.VITE_FEATURE_FLAG_EXTERNAL_TICKET_SYSTEM_SUPPORT ===
      'true'
    );
  }
}

export default Config;
