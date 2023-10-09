import React from 'react';
import { styled } from '@mui/material/styles';
import { TranslatableContextProvider } from 'ra-core';
import clsx from 'classnames';
import {
  GetTranslatableSource,
  TranslatableInputsClasses,
  TranslatableInputsProps,
  TranslatableInputsTabContent,
  TranslatableInputsTabs,
} from 'react-admin';

import { useCustomizedReactAdminTranslatable } from './useTranslatable';

/**
 * @deprecated TODO: should be replaced with the React-Admin implementation immediately when the
 * getSource can be added to the `TranslatableContextProvider` context.
 *
 * Override the original TranslatableInputs from the React-admin.
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
export const CustomizedReactAdminTranslatableInputs = (
  props: TranslatableInputsProps & {
    customGetSource: (locale: string) => GetTranslatableSource;
  }
): React.ReactElement => {
  const {
    className,
    defaultLocale,
    fullWidth,
    locales,
    groupKey = '',
    selector = <TranslatableInputsTabs groupKey={groupKey} />,
    children,
    margin,
    sx,
    StackProps = {},
    customGetSource,
  } = props;
  const context = useCustomizedReactAdminTranslatable({
    defaultLocale,
    locales,
    customGetSource,
  });

  return (
    <Root
      className={clsx(className, TranslatableInputsClasses.root, {
        [TranslatableInputsClasses.fullWidth]: fullWidth,
      })}
      sx={sx}
    >
      <TranslatableContextProvider value={context}>
        {selector}
        {locales.map((locale) => (
          <TranslatableInputsTabContent
            key={locale}
            locale={locale}
            groupKey={groupKey}
            margin={margin}
            {...StackProps}
          >
            {children}
          </TranslatableInputsTabContent>
        ))}
      </TranslatableContextProvider>
    </Root>
  );
};

const PREFIX = 'RaTranslatableInputs';

const Root = styled('div', {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  flexGrow: 1,
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(0.5),

  [`&.${TranslatableInputsClasses.fullWidth}`]: {
    width: '100%',
  },
}));
