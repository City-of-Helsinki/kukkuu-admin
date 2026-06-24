import {
  TextField,
  SelectField,
  SimpleShowLayout,
  useTranslate,
  FunctionField,
  useRecordContext,
  Loading,
} from 'react-admin';
import Chip from '@mui/material/Chip';

import { toShortDateTimeString } from '../../../common/utils';
import KukkuuDetailPage from '../../application/layout/kukkuuDetailPage/KukkuuDetailPage';
import MessageRecipientCountField from '../fields/MessageRecipientCountField';
import { recipientSelectionChoices } from '../choices';
import TranslatableProvider from '../../../common/providers/TranslatableProvider';
import MessageDetailToolbar from './MessageDetailsToolbar';
import useTranslatableContext from '../../../common/hooks/useTranslatableContext';
import {
  type MessageNode,
  ProtocolType,
} from '../../api/generatedTypes/graphql';

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
          link: '/messages',
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
  const t = useTranslate();
  const { selector: languageTabsComponent, getSource: translatableField } =
    useTranslatableContext();

  if (!record) return <Loading />;

  return (
    <SimpleShowLayout
      sx={(theme) => ({
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
      })}
    >
      {record.protocol !== ProtocolType.Sms && languageTabsComponent}
      <MessageRecipientCountField />
      <FunctionField
        source="project.year"
        label="messages.fields.project.year.label"
        render={(record?: Partial<MessageNode>) => record?.project?.year}
      />
      <SelectField
        source="recipientSelection"
        label="messages.fields.recipientSelection.label"
        choices={recipientSelectionChoices}
        sx={{ gridColumn: '1 !important' }}
      />
      <TextField
        source="event.name"
        label="messages.fields.event.label"
        sx={{ gridColumn: '2 !important' }}
        emptyText={t('messages.fields.event.all')}
      />
      <FunctionField
        source="occurrences"
        label="messages.fields.occurrences.label"
        render={(record?: Partial<MessageNode>) => {
          const stringifiedRecords =
            record?.occurrences?.edges.map((connection) =>
              connection?.node
                ? toShortDateTimeString(new Date(connection.node.time))
                : ''
            ) ?? [];

          if (stringifiedRecords.length === 0) {
            return t('messages.fields.occurrences.all');
          }

          return stringifiedRecords.map((record: string) => (
            <Chip
              key={record}
              label={record}
              sx={(theme) => ({
                marginBottom: theme.spacing(0.5),
                '&:not(:last-child)': {
                  marginRight: theme.spacing(0.5),
                },
              })}
            />
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
        sx={{ maxWidth: '600px', whiteSpace: 'break-spaces' }}
      />
    </SimpleShowLayout>
  );
}

export default MessagesDetail;
