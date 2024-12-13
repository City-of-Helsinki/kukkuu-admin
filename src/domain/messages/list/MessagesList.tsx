import React from 'react';
import {
  type RaRecord,
  useTranslate,
  TextField,
  SelectField,
  FunctionField,
  Labeled,
  Pagination,
} from 'react-admin';
import { get } from 'lodash';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';

import { toDateTimeString } from '../../../common/utils';
import KukkuuListPage from '../../application/layout/kukkuuListPage/KukkuuListPage';
import PublishedField from '../../../common/components/publishedField/PublishedField';
import { recipientSelectionChoices } from '../choices';
import MessagesListToolbar from './MessageListToolbar';
import styles from './messageList.module.css';
import { ProtocolType } from '../../api/generatedTypes/graphql';
import Empty from './Empty';

const MessagesList = () => {
  const t = useTranslate();

  return (
    <KukkuuListPage
      pageTitle={t('messages.list.title')}
      reactAdminProps={{
        actions: <MessagesListToolbar />,
        empty: <Empty />,
        exporter: false,
        pagination: <Pagination rowsPerPageOptions={[25, 100]} />,
        perPage: 25,
      }}
    >
      <FunctionField
        label="messages.fields.protocol.label"
        render={(record: RaRecord) => {
          if (!record) {
            return null;
          }

          const labelMap: Record<ProtocolType, React.ReactElement> = {
            [ProtocolType.Email]: <MailOutlineIcon />,
            [ProtocolType.Sms]: <TextsmsOutlinedIcon />,
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
      <Labeled label={t('messages.fields.sentAt.label')}>
        <PublishedField
          source="sentAt"
          render={(date: Date) =>
            `${t('messages.fields.sentAt.sent')} ${toDateTimeString(date)}`
          }
          emptyText={t('messages.fields.sentAt.notSent')}
          className={styles.bold}
        />
      </Labeled>
    </KukkuuListPage>
  );
};

export default MessagesList;
