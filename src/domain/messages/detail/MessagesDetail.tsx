import React from 'react';
import {
  TextField,
  SelectField,
  SimpleShowLayout,
  useTranslate,
  EditButton,
  TopToolbar,
  FunctionField,
  useResourceDefinition,
  useResourceContext,
  useRecordContext,
} from 'react-admin';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import get from 'lodash/get';

import { ProtocolType } from '../../../api/generatedTypes/globalTypes';
import { Message_message as Message } from '../../../api/generatedTypes/Message';
import useLanguageTabs from '../../../common/hooks/useLanguageTabs';
import { toDateTimeString, toShortDateTimeString } from '../../../common/utils';
import KukkuuDetailPage from '../../application/layout/kukkuuDetailPage/KukkuuDetailPage';
import MessageRecipientCountField from '../fields/MessageRecipientCountField';
import { recipientSelectionChoices } from '../choices';
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

const useStyles = makeStyles((theme) => ({
  showLayout: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: 'auto',
    columnGap: theme.spacing(2),
    rowGap: theme.spacing(2),
    '& > *': {
      gridColumn: '1 / -1',
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
  const classes = useStyles();
  const [languageTabsComponent, translatableField] = useLanguageTabs();
  const t = useTranslate();
  const resource = useResourceContext();
  const {
    options: { label },
  } = useResourceDefinition();
  return (
    <KukkuuDetailPage
      pageTitleSource="subject"
      reactAdminProps={{
        actions: <MessageDetailToolbar />,
      }}
      breadcrumbs={[
        {
          label: t(label),
          link: `/${resource}` || null,
        },
      ]}
    >
      <SimpleShowLayout className={classes.showLayout}>
        <ShowWhen source="protocol" notIn={[ProtocolType.SMS]}>
          {languageTabsComponent}
        </ShowWhen>
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
    </KukkuuDetailPage>
  );
};

type ShowWhenProps = {
  record?: any;
  source: string;
  notIn: string[];
  children: React.ReactNode;
};

function ShowWhen({ record, source, notIn, children }: ShowWhenProps) {
  const actualValue = get(record, source, null);

  if (notIn.includes(actualValue)) {
    return null;
  }

  return <>{children}</>;
}

export default MessagesDetail;
