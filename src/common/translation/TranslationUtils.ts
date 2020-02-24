/**
 * Get translated field value base on current user locale
 * @param fieldName Data field with translated values from API
 * @param currentLocale Current locale
 */
export const getTranslatedField = (fieldName: string, currentLocale: string) =>
  `translations.${currentLocale}.${fieldName}`;
