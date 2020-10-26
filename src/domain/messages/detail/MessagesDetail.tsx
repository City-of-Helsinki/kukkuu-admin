import React from 'react';
import {
  TextField,
  SelectField,
  SimpleShowLayout,
  ResourceComponentPropsWithId,
  useTranslate,
  EditButton,
  TopToolbar,
  useLocale,
} from 'react-admin';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import { Message_message as Message } from '../../../api/generatedTypes/Message';
import { toDateTimeString } from '../../../common/utils';
import KukkuuDetailPage from '../../../common/components/kukkuuDetailPage/KukkuuDetailPage';
import useLanguageTabs from '../hooks/useLanguageTabs';
import { recipientSelectionChoices } from '../choices';
import MessageSendButton from './MessageSendButton';

const useMessageDetailsToolbarStyles = makeStyles((theme) => ({
  wrapper: {
    marginBottom: theme.spacing(3),
  },
  meta: {
    fontSize: theme.typography.body2.fontSize,
  },
  metaTitle: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.body2.fontSize,
  },
}));

type MessageDetailToolbarProps = {
  basePath?: string;
  data?: Message;
};

const MessageDetailToolbar = ({
  basePath,
  data,
}: MessageDetailToolbarProps) => {
  const classes = useMessageDetailsToolbarStyles();
  const locale = useLocale();
  const t = useTranslate();

  const isSent = Boolean(data?.sentAt);

  if (isSent) {
    return (
      <div className={classes.wrapper}>
        <Typography className={classes.meta}>
          <Typography component="span" className={classes.metaTitle}>
            {t('messages.fields.sentAt.sent')}
          </Typography>
          {` ${toDateTimeString(new Date(data?.sentAt), locale)}`}
        </Typography>
        <Typography className={classes.meta}>
          <Typography component="span" className={classes.metaTitle}>
            {t('messages.fields.recipientCount.label')}
          </Typography>
          {` ${data?.recipientCount}`}
        </Typography>
      </div>
    );
  }

  return (
    <TopToolbar>
      {data && <EditButton basePath={basePath} record={data} />}
      {data && basePath && (
        <MessageSendButton basePath={basePath} record={data} />
      )}
    </TopToolbar>
  );
};

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

const MessagesDetail = (props: ResourceComponentPropsWithId) => {
  const classes = useStyles();
  const [languageTabsComponent, translatableField] = useLanguageTabs();
  const t = useTranslate();

  return (
    <KukkuuDetailPage
      pageTitleSource="subject"
      reactAdminProps={props}
      actions={<MessageDetailToolbar />}
    >
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
