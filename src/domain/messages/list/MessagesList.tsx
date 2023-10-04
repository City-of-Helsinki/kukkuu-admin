import React from 'react';
import {
  useTranslate,
  TextField,
  SelectField,
  FunctionField,
  RaRecord,
} from 'react-admin';
import { get } from 'lodash';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';

import { ProtocolType } from '../../../api/generatedTypes/globalTypes';
import { toDateTimeString } from '../../../common/utils';
import KukkuuListPage from '../../application/layout/kukkuuListPage/KukkuuListPage';
import PublishedField from '../../../common/components/publishedField/PublishedField';
import { recipientSelectionChoices } from '../choices';
import MessagesListToolbar from './MessageListToolbar';
import styles from './messageList.module.css';

const MessagesList = () => {
  const t = useTranslate();

  return (
    <KukkuuListPage
      pageTitle={t('messages.list.title')}
      reactAdminProps={{
        actions: <MessagesListToolbar />,
      }}
    >
      <FunctionField
        label="messages.fields.protocol.label"
        render={(record: RaRecord) => {
          if (!record) {
            return null;
          }

          const labelMap: Record<ProtocolType, React.ReactElement> = {
            [ProtocolType.EMAIL]: <MailOutlineIcon />,
            [ProtocolType.SMS]: <TextsmsOutlinedIcon />,
          };
          const protocol = record.protocol as ProtocolType;

          return labelMap[protocol] ?? null;
        }}
      />
      <FunctionField
        label="messages.fields.bodyText.label2"
        className={styles.bold}
        render={(record: RaRecord) => {
          const maxLength = 66;
          const bodyText = record?.bodyText ?? '';
          const hasEllipsis = bodyText?.length >= maxLength;

          return `${bodyText?.substring(0, 66)}${hasEllipsis ? '...' : ''}`;
        }}
      />
      <SelectField
        label={t('messages.fields.recipientSelection.label')}
        source="recipientSelection"
        choices={recipientSelectionChoices}
      />
      <TextField
        label={t('messages.fields.event.label')}
        source="event.name"
        emptyText={t('generic.all')}
      />
      <FunctionField
        label={t('messages.fields.occurrences.label')}
        source="occurrences"
        render={(record: any) => {
          const occurrences = get(record, 'occurrences.edges', []);

          if (occurrences.length === 0) {
            return t('generic.all');
          }

          return occurrences.length;
        }}
      />
      <TextField
        label={t('messages.fields.recipientCount.label')}
        source="recipientCount"
        className={styles.bold}
      />
      <PublishedField
        label={t('messages.fields.sentAt.label')}
        source="sentAt"
        render={(date: Date) =>
          `${t('messages.fields.sentAt.sent')} ${toDateTimeString(date)}`
        }
        emptyText={t('messages.fields.sentAt.notSent')}
        className={styles.bold}
      />
    </KukkuuListPage>
  );
};

export default MessagesList;
