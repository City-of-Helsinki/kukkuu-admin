import { Language } from '../domain/api/generatedTypes/graphql';

export const languageChoices = Object.keys(Language).map((language) => ({
  id: language.toUpperCase(),
  name: `languages.${language.toUpperCase()}`,
}));
