import React from 'react';
import { useTranslate } from 'react-admin';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    fontSize: theme.typography.fontSize,
    fontFamily: theme.typography.fontFamily,
  },
  value: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

const MessageRecipientCountField = ({ record }: any) => {
  const t = useTranslate();
  const classes = useStyles();

  const sentAt = record?.sentAt;
  const recipientCount = record?.recipientCount;

  // If message is sent, the recipient count is shown under the message
  // title and we don't need to show it in the message body.
  if (sentAt) {
    return null;
  }

  return (
    <div className={classes.container}>
      <span className={classes.value}>{recipientCount}</span>{' '}
      {t('messages.fields.recipientCount.label2')}
    </div>
  );
};

export default MessageRecipientCountField;
