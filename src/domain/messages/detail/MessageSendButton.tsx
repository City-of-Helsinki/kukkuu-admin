import React from 'react';
import {
  useRecordContext,
  useResourceContext,
  useTranslate,
} from 'react-admin';
import SendIcon from '@mui/icons-material/Check';

import ConfirmMutationButton from '../../../common/components/confirmMutationButton/ConfirmMutationButton';
import useMessageSendMutation from '../hooks/useMessageSendMutation';
import type { MessageNode } from '../../api/generatedTypes/graphql';

type Props = {
  className?: string;
};

const MessagesSendButton = ({ className }: Props) => {
  const record = useRecordContext<MessageNode>();
  const resource = useResourceContext();
  const basePath = `/${resource}`;
  const t = useTranslate();
  const mutation = useMessageSendMutation({
    basePath,
    params: { id: record.id },
  });
  return (
    <ConfirmMutationButton
      className={className}
      buttonLabel="messages.send.do"
      icon={<SendIcon />}
      mutation={mutation}
      confirmModalProps={{
        title: t('messages.send.confirm.title', {
          messageSubject: record.subject,
        }),
        content: 'messages.send.confirm.content',
        translateOptions: {
          recipientCount: record?.recipientCount ?? '?',
        },
      }}
    />
  );
};

export default MessagesSendButton;
