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
  FunctionField,
} from 'react-admin';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import { Message_message as Message } from '../../../api/generatedTypes/Message';
import { toDateTimeString, toShortDateTimeString } from '../../../common/utils';
import KukkuuDetailPage from '../../../common/components/kukkuuDetailPage/KukkuuDetailPage';
import useLanguageTabs from '../hooks/useLanguageTabs';
import MessageRecipientCountField from '../fields/MessageRecipientCountField';
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
  sendButton: {
    marginLeft: theme.spacing(1),
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
        <MessageSendButton
          basePath={basePath}
          record={data}
          className={classes.sendButton}
        />
      )}
    </TopToolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  showLayout: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: 'auto',
    columnGap: theme.spacing(2) + 'px',
    rowGap: theme.spacing(2) + 'px',
    '& > *': {
      gridColumn: '1 / -1',
    },
  },
  recipientSelection: {
    gridColumn: '1 !important',
  },
  event: {
    gridColumn: '2 !important',
  },
  textField: {
    maxWidth: '600px',
    whiteSpace: 'break-spaces',
  },
  chip: {
    marginBottom: theme.spacing(0.5) + 'px',
    '&:not(:last-child)': {
      marginRight: theme.spacing(0.5) + 'px',
    },
  },
}));

const MessagesDetail = (props: ResourceComponentPropsWithId) => {
  const classes = useStyles();
  const [languageTabsComponent, translatableField] = useLanguageTabs();
  const t = useTranslate();
  const locale = useLocale();

  return (
    <KukkuuDetailPage
      pageTitleSource="subject"
      reactAdminProps={props}
      actions={<MessageDetailToolbar />}
    >
      <SimpleShowLayout className={classes.showLayout}>
        {languageTabsComponent}
        <MessageRecipientCountField />
        <SelectField
          source="recipientSelection"
          label="messages.fields.recipientSelection.label"
          choices={recipientSelectionChoices}
          className={classes.recipientSelection}
        />
        <TextField
          source="event.name"
          label="messages.fields.event.label"
          className={classes.event}
          emptyText={t('messages.fields.event.all')}
        />
        <FunctionField
          source="occurrences"
          label="messages.fields.occurrences.label"
          render={(record?: any) => {
            const stringifiedRecords =
              record &&
              record.occurrences.edges.map((connection: any) =>
                toShortDateTimeString(new Date(connection.node.time), locale)
              );

            if (stringifiedRecords.length === 0) {
              return t('messages.fields.occurrences.all');
            }

            return stringifiedRecords.map((record: string) => (
              <Chip key={record} label={record} className={classes.chip} />
            ));
          }}
        />
        <TextField
          source={translatableField('subject')}
          label="messages.fields.subject.label2"
        />
        <TextField
          component="pre"
          source={translatableField('bodyText')}
          label="messages.fields.bodyText.label"
          className={classes.textField}
        />
      </SimpleShowLayout>
    </KukkuuDetailPage>
  );
};

export default MessagesDetail;
