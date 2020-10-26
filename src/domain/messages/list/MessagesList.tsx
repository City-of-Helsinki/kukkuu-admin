import React from 'react';
import {
  ResourceComponentPropsWithId,
  useTranslate,
  TextField,
  SelectField,
  useLocale,
} from 'react-admin';

import { toDateTimeString } from '../../../common/utils';
import useTranslationDataKey from '../../../common/hooks/useTranslationDataKey';
import KukkuuListPage from '../../../common/components/kukkuuListPage/KukkuuListPage';
import PublishedField from '../../../common/components/publishedField/PublishedField';
import { recipientSelectionChoices } from '../choices';
import styles from './messageList.module.css';

const MessagesList = (props: ResourceComponentPropsWithId) => {
  const t = useTranslate();
  const locale = useLocale();
  const getKey = useTranslationDataKey();

  return (
    <KukkuuListPage
      reactAdminProps={props}
      pageTitle={t('messages.list.title')}
    >
      <TextField
        label={t('messages.fields.subject.label')}
        source={getKey('subject')}
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
          `${t('messages.fields.sentAt.sent')} ${toDateTimeString(
            date,
            locale
          )}`
        }
        emptyText={t('messages.fields.sentAt.notSent')}
        className={styles.bold}
      />
    </KukkuuListPage>
  );
};

export default MessagesList;
