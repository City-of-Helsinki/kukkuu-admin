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
import useLanguageTabs from '../../common/hooks/useLanguageTabs';

const VenueTitle = () => {
  const record = useRecordContext();
  // FIXME: is the title wrong, because the translations should always be an array?
  return <CardHeader title={record ? `${record.translations.FI.name}` : ''} />;
};

const VenueShow = () => {
  const translate = useTranslate();
  const [languageTabsComponent, translatableField] = useLanguageTabs();

  return (
    <KukkuuShow>
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
    </KukkuuShow>
  );
};

export default VenueShow;
