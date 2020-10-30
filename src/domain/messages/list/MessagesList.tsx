import React from 'react';
import {
  ResourceComponentPropsWithId,
  useTranslate,
  TextField,
  SelectField,
  useLocale,
  FunctionField,
} from 'react-admin';
import { get } from 'lodash';

import { toDateTimeString } from '../../../common/utils';
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
