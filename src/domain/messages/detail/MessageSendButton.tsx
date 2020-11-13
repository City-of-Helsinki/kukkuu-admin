import React from 'react';
import { useTranslate } from 'react-admin';
import SendIcon from '@material-ui/icons/Check';

import { Message_message as Message } from '../../../api/generatedTypes/Message';
import ConfirmMutationButton from '../../../common/components/confirmMutationButton/ConfirmMutationButton';

type Props = {
  basePath: string;
  record: Message;
  className?: string;
};

const MessagesSendButton = ({ basePath, record, className }: Props) => {
  const t = useTranslate();

  return (
    <ConfirmMutationButton
      basePath={basePath}
      className={className}
      buttonLabel="messages.send.do"
      icon={<SendIcon />}
      successMessage="messages.send.success"
      errorMessage="messages.send.error"
      mutation={{
        type: 'send',
        resource: 'messages',
        payload: { id: record.id },
      }}
      confirmModalProps={{
        title: t('messages.send.confirm.title', {
          messageSubject: record.subject,
        }),
        content: 'messages.send.confirm.content',
        translateOptions: {
          recipientCount: record?.recipientCount || '?',
        },
      }}
    />
  );
};

export default MessagesSendButton;
