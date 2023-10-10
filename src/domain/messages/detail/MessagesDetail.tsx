import React from 'react';
import {
  TextField,
  SelectField,
  SimpleShowLayout,
  useTranslate,
  FunctionField,
  useRecordContext,
  Loading,
} from 'react-admin';
import { makeStyles } from '@mui/styles';
import Chip from '@mui/material/Chip';

import { ProtocolType } from '../../../api/generatedTypes/globalTypes';
import { toShortDateTimeString } from '../../../common/utils';
import KukkuuDetailPage from '../../application/layout/kukkuuDetailPage/KukkuuDetailPage';
import MessageRecipientCountField from '../fields/MessageRecipientCountField';
import { recipientSelectionChoices } from '../choices';
import TranslatableProvider from '../../../common/providers/TranslatableProvider';
import MessageDetailToolbar from './MessageDetailsToolbar';
import useTranslatableContext from '../../../common/hooks/useTranslatableContext';

const useStyles = makeStyles((theme) => ({
  showLayout: {
    '&>div': {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: 'auto',
      columnGap: theme.spacing(2),
      rowGap: theme.spacing(2),
      '& > *': {
        gridColumn: '1 / -1',
      },
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
    marginBottom: theme.spacing(0.5),
    '&:not(:last-child)': {
      marginRight: theme.spacing(0.5),
    },
  },
}));

const MessagesDetail = () => {
  const t = useTranslate();

  return (
    <KukkuuDetailPage
      pageTitleSource="subject"
      reactAdminProps={{
        actions: <MessageDetailToolbar />,
      }}
      breadcrumbs={[
        {
          label: t('messages.list.title'),
          link: `/messages` || null,
        },
      ]}
    >
      <TranslatableProvider>
        <MessageDetails />
      </TranslatableProvider>
    </KukkuuDetailPage>
  );
};

function MessageDetails() {
  const record = useRecordContext();
  const classes = useStyles();
  const t = useTranslate();
  const { selector: languageTabsComponent, getSource: translatableField } =
    useTranslatableContext();

  if (!record) return <Loading />;

  return (
    <SimpleShowLayout className={classes.showLayout}>
      {record.protocol !== ProtocolType.SMS && languageTabsComponent}
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
              toShortDateTimeString(new Date(connection.node.time))
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
  );
}

export default MessagesDetail;
