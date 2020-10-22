import React from 'react';
import {
  TextField,
  SelectField,
  SimpleShowLayout,
  ResourceComponentPropsWithId,
  useTranslate,
} from 'react-admin';
import { makeStyles } from '@material-ui/core';

import KukkuuDetailPage from '../../../common/components/kukkuuDetailPage/KukkuuDetailPage';
import useLanguageTabs from '../hooks/useLanguageTabs';
import { recipientSelectionChoices } from '../choices';

const useStyles = makeStyles({
  inline: {
    display: 'inline-flex',
    width: '50%',
    '& > *': {
      width: '100%',
    },
  },
  showLayout: {
    '& > .ra-field': {
      marginBottom: '1rem',
    },
  },
});

const MessagesDetail = ({
  hasShow,
  ...props
}: ResourceComponentPropsWithId) => {
  const classes = useStyles();
  const [languageTabsComponent, translatableField] = useLanguageTabs();
  const t = useTranslate();

  return (
    <KukkuuDetailPage pageTitleSource="subject" reactAdminProps={props}>
      <SimpleShowLayout className={classes.showLayout}>
        {languageTabsComponent}
        <SelectField
          source="recipientSelection"
          label="messages.fields.recipientSelection.label"
          choices={recipientSelectionChoices}
          className={classes.inline}
        />
        <TextField
          source="event.name"
          label="messages.fields.event.label"
          className={classes.inline}
          emptyText={t('messages.fields.event.all')}
        />
        <TextField
          source={translatableField('subject')}
          label="messages.fields.subject.label2"
        />
        <TextField
          component="pre"
          source={translatableField('bodyText')}
          label="messages.fields.bodyText.label"
        />
      </SimpleShowLayout>
    </KukkuuDetailPage>
  );
};

export default MessagesDetail;
