import { Language } from '../api/generatedTypes/globalTypes';

export const languageChoices = Object.keys(Language).map(language => ({
  id: language,
  name: `languages.${language}`,
}));
