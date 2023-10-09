import { useState, useMemo } from 'react';
import {
  GetTranslatableSource,
  TranslatableContextValue,
  UseTranslatableOptions,
  useLocaleState,
  useResourceContext,
  useTranslateLabel,
} from 'react-admin';

/**
 * @deprecated TODO: should be replaced with the React-Admin implementation immediately when the
 * getSource can be added to the `TranslatableContextProvider` context.
 *
 * Override the original `useTranslatable` from the React-admin.
 * The problem with the original implementation is that the getSource-function
 * cannot be given as a prop to the context.
 * That leads to a situation where the React-Admin implementation does not support
 * the model structure that the Kukkuu has for translations.
 *
 * Original: https://marmelab.com/react-admin/TranslatableInputs.html
 * {
 *     name: {
 *         en: 'The english value',
 *         fr: 'The french value',
 *         tlh: 'The klingon value',
 *     },
 *     description: {
 *         en: 'The english value',
 *         fr: 'The french value',
 *         tlh: 'The klingon value',
 *     }
 * }
 *
 * The Kukkuu translation mapping works the following way:
 * {
 *      translations: {
 *          FI: {
 *              name: "The Finnish name",
 *              description: "The Finnish description"
 *          },
 *         SV: {
 *              name: "Thw Swedish name",
 *              description: "The Swedish description"
 *          },
 *         EN: {
 *              name: "The English name",
 *              description: "The English description"
 *          }
 *      }
 * }
 *
 * Since the actual issue is in the getSource-method, that is
 * created by the `useTranslatable` and provided by the `TranslatableContextProvider`,
 * the container component (`TranslatableInputs`) and the `useTranlatable` -hook needs to cloned and fixed.
 */
export const useCustomizedReactAdminTranslatable = (
  options: UseTranslatableOptions & {
    customGetSource: (locale: string) => GetTranslatableSource;
  }
): TranslatableContextValue => {
  const [localeFromUI] = useLocaleState();
  const { defaultLocale = localeFromUI, locales, customGetSource } = options;
  const [selectedLocale, setSelectedLocale] = useState(defaultLocale);

  const resource = useResourceContext({});
  const translateLabel = useTranslateLabel();

  const context = useMemo<TranslatableContextValue>(
    () => ({
      getSource: customGetSource(selectedLocale),
      getLabel: (source: string, label?: string) =>
        translateLabel({ source, resource, label }) as string,
      locales,
      selectedLocale,
      selectLocale: setSelectedLocale,
    }),
    [customGetSource, locales, resource, selectedLocale, translateLabel]
  );

  return context;
};
