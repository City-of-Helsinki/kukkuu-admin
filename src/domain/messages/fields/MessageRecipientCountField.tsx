import { useRecordContext, useTranslate } from 'react-admin';
import { useTheme } from '@mui/material';

const MessageRecipientCountField = () => {
  const record = useRecordContext();
  const t = useTranslate();
  const theme = useTheme();

  const sentAt = record?.sentAt;
  const recipientCount = record?.recipientCount;

  // If message is sent, the recipient count is shown under the message
  // title and we don't need to show it in the message body.
  if (sentAt) {
    return null;
  }

  return (
    <div
      style={{
        fontSize: theme.typography.fontSize,
        fontFamily: theme.typography.fontFamily,
      }}
    >
      <span style={{ fontWeight: theme.typography.fontWeightBold as number }}>
        {recipientCount}
      </span>{' '}
      {t('messages.fields.recipientCount.label2')}
    </div>
  );
};

export default MessageRecipientCountField;
