import React, { useState } from 'react';
import { TextField, useTranslate, SimpleShowLayout } from 'react-admin';
import { CardHeader } from '@material-ui/core';
import omit from 'lodash/omit';

import LanguageTabs from '../../common/components/languageTab/LanguageTabs';
import { Language } from '../../api/generatedTypes/globalTypes';
import LongTextField from '../../common/components/longTextField/LongTextField';
import KukkuuShow from '../application/layout/kukkuuDetailPage/KukkuuShow';

const VenueTitle = ({
  basePath,
  record,
}: {
  basePath?: string;
  record?: any;
}) => {
  return <CardHeader title={record ? `${record.translations.FI.name}` : ''} />;
};

const VenueShow = (props: any) => {
  const translate = useTranslate();
  const [selectedLanguage, selectLanguage] = useState(Language.FI);
  const translation = `translations.${selectedLanguage}`;

  return (
    <KukkuuShow {...omit(props, 'hasShow')}>
      <SimpleShowLayout>
        <VenueTitle />
        <LanguageTabs
          selectedLanguage={selectedLanguage}
          onSelect={selectLanguage}
        />
        <TextField
          source={`${translation}.name`}
          label={translate('venues.fields.name.label')}
        />
        <LongTextField
          source={`${translation}.address`}
          label={translate('venues.fields.address.label')}
        />
        <LongTextField
          source={`${translation}.description`}
          label={translate('venues.fields.description.label')}
        />
        <LongTextField
          source={`${translation}.accessibilityInfo`}
          label={translate('venues.fields.accessibilityInfo.label')}
        />
        <LongTextField
          source={`${translation}.arrivalInstructions`}
          label={translate('venues.fields.arrivalInstructions.label')}
        />
        <LongTextField
          source={`${translation}.additionalInfo`}
          label={translate('venues.fields.additionalInfo.label')}
        />
        <LongTextField
          source={`${translation}.wcAndFacilities`}
          label={translate('venues.fields.wcAndFacilities.label')}
        />
      </SimpleShowLayout>
    </KukkuuShow>
  );
};

export default VenueShow;
