import React from 'react';
import {
  ResourceComponentPropsWithId,
  useTranslate,
  TextField,
  SelectField,
  useLocale,
} from 'react-admin';

import KukkuuListPage from '../../../common/components/kukkuuListPage/KukkuuListPage';
import PublishedField from '../../../common/components/publishedField/PublishedField';
import { recipientSelectionChoices } from '../choices';
import styles from './messageList.module.css';

const MessagesList = (props: ResourceComponentPropsWithId) => {
  const t = useTranslate();
  const locale = useLocale();

  return (
    <KukkuuListPage
      reactAdminProps={props}
      pageTitle={t('messages.list.title')}
    >
      <TextField
        label={t('messages.fields.subject.label')}
        source="subject"
        className={styles.bold}
      />
      <SelectField
        label={t('messages.fields.recipientSelection.label')}
        source="recipientSelection"
        choices={recipientSelectionChoices}
      />
      <TextField
        label={t('messages.fields.event.label')}
        source="event.name"
        emptyText={t('messages.fields.event.all')}
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
          `${t('messages.fields.sentAt.sent')} ${date.toLocaleString(locale, {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}`
        }
        emptyText={t('messages.fields.sentAt.notSent')}
        className={styles.bold}
      />
    </KukkuuListPage>
  );
};

export default MessagesList;
