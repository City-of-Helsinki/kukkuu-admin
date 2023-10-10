import React from 'react';
import {
  useTranslate,
  EditButton,
  TopToolbar,
  useResourceContext,
  useRecordContext,
} from 'react-admin';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';

import { Message_message as Message } from '../../../api/generatedTypes/Message';
import { toDateTimeString } from '../../../common/utils';
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

const MessageDetailToolbar = () => {
  const record = useRecordContext<Message>();
  const resource = useResourceContext();
  const basePath = `/${resource}`;
  const classes = useMessageDetailsToolbarStyles();
  const t = useTranslate();

  const isSent = Boolean(record?.sentAt);

  if (isSent) {
    return (
      <div className={classes.wrapper}>
        <Typography className={classes.meta}>
          <Typography component="span" className={classes.metaTitle}>
            {t('messages.fields.sentAt.sent')}
          </Typography>
          {` ${toDateTimeString(new Date(record?.sentAt))}`}
        </Typography>
        <Typography className={classes.meta}>
          <Typography component="span" className={classes.metaTitle}>
            {t('messages.fields.recipientCount.label')}
          </Typography>
          {` ${record?.recipientCount}`}
        </Typography>
      </div>
    );
  }

  return (
    <TopToolbar>
      {record && <EditButton record={record} />}
      {record && basePath && (
        <MessageSendButton
          basePath={basePath}
          record={record}
          className={classes.sendButton}
        />
      )}
    </TopToolbar>
  );
};

export default MessageDetailToolbar;
