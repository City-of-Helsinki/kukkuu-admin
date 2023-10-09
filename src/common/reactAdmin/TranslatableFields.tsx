import {
  GetTranslatableSource,
  TranslatableFieldsProps,
  TranslatableFieldsTabContent,
} from 'react-admin';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { ReactElement } from 'react';
import { TranslatableContextProvider, useRecordContext } from 'ra-core';

import { useCustomizedReactAdminTranslatable } from './useTranslatable';
import { TranslatableFieldsTabs } from './TranslatableFieldTabs';

export const CustomizedReactAdminTranslatableFields = (
  props: TranslatableFieldsProps & {
    customGetSource: (locale: string) => GetTranslatableSource;
  }
): ReactElement => {
  const {
    defaultLocale,
    locales,
    groupKey = '',
    selector = <TranslatableFieldsTabs groupKey={groupKey} />,
    children,
    resource,
    className,
    customGetSource,
  } = props;
  const record = useRecordContext(props);
  const context = useCustomizedReactAdminTranslatable({
    defaultLocale,
    locales,
    customGetSource,
  });

  return (
    <Root className={className}>
      <TranslatableContextProvider value={context}>
        {selector}
        {locales.map((locale) => (
          <TranslatableFieldsTabContent
            key={locale}
            locale={locale}
            record={record}
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            resource={resource!}
            groupKey={groupKey}
          >
            {children}
          </TranslatableFieldsTabContent>
        ))}
      </TranslatableContextProvider>
    </Root>
  );
};

const PREFIX = 'RaTranslatableFields';

const Root = styled('div', {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  flexGrow: 1,
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(0.5),
}));
