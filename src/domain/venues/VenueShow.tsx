import React from 'react';
import {
  TextField,
  useTranslate,
  SimpleShowLayout,
  useRecordContext,
} from 'react-admin';
import { CardHeader } from '@mui/material';

import LongTextField from '../../common/components/longTextField/LongTextField';
import KukkuuShow from '../application/layout/kukkuuDetailPage/KukkuuShow';
import TranslatableProvider from '../../common/providers/TranslatableProvider';
import TranslatableContext from '../../common/contexts/TranslatableContext';

const VenueTitle = () => {
  const record = useRecordContext();
  // FIXME: is the title wrong, because the translations should always be an array?
  return <CardHeader title={record ? `${record.translations.FI.name}` : ''} />;
};

const VenueShow = () => {
  const translate = useTranslate();

  return (
    <KukkuuShow>
      <TranslatableProvider>
        <TranslatableContext.Consumer>
          {({
            selector: languageTabsComponent,
            getSource: translatableField,
          }) => (
            <SimpleShowLayout>
              <VenueTitle />
              {languageTabsComponent}
              <TextField
                source={translatableField('name')}
                label={translate('venues.fields.name.label')}
              />
              <LongTextField
                source={translatableField('address')}
                label={translate('venues.fields.address.label')}
              />
              <LongTextField
                source={translatableField('description')}
                label={translate('venues.fields.description.label')}
              />
              <LongTextField
                source={translatableField('accessibilityInfo')}
                label={translate('venues.fields.accessibilityInfo.label')}
              />
              <LongTextField
                source={translatableField('arrivalInstructions')}
                label={translate('venues.fields.arrivalInstructions.label')}
              />
              <LongTextField
                source={translatableField('additionalInfo')}
                label={translate('venues.fields.additionalInfo.label')}
              />
              <LongTextField
                source={translatableField('wcAndFacilities')}
                label={translate('venues.fields.wcAndFacilities.label')}
              />
            </SimpleShowLayout>
          )}
        </TranslatableContext.Consumer>
      </TranslatableProvider>
    </KukkuuShow>
  );
};

export default VenueShow;
