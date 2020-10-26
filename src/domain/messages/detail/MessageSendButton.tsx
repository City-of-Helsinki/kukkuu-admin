import React, { useState } from 'react';
import {
  useTranslate,
  Button,
  useMutation,
  Confirm,
  useNotify,
} from 'react-admin';
import { useHistory } from 'react-router';
import SendIcon from '@material-ui/icons/Check';
import * as Sentry from '@sentry/browser';
import get from 'lodash/get';

import useTranslationDataKey from '../../../common/hooks/useTranslationDataKey';
import { Message_message as Message } from '../../../api/generatedTypes/Message';

type Props = {
  basePath: string;
  record: Message;
  className?: string;
};

const MessagesSendButton = ({ basePath, record, className }: Props) => {
  const t = useTranslate();
  const history = useHistory();
  const notify = useNotify();
  const [sendMessage, { loading }] = useMutation(
    {
      type: 'send',
      resource: 'messages',
      payload: { id: record.id },
    },
    {
      onSuccess: () => {
        notify('messages.send.success');
        history.push(basePath);
      },
      onFailure: (error: Error) => {
        Sentry.captureException(error);
        notify('messages.send.error', 'warning');
      },
    }
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const getKey = useTranslationDataKey();

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleSend = async () => {
    if (!loading) {
      sendMessage();
    }
  };

  return (
    <>
      <Button
        onClick={handleDialogOpen}
        label="messages.send.do"
        key="button"
        className={className}
      >
        <SendIcon />
      </Button>
      <Confirm
        isOpen={isDialogOpen}
        loading={loading}
        title={t('messages.send.confirm.title', {
          messageSubject: get(record, getKey('subject')),
        })}
        content="messages.send.confirm.content"
        onConfirm={handleSend}
        onClose={handleDialogClose}
      />
    </>
  );
};

export default MessagesSendButton;
