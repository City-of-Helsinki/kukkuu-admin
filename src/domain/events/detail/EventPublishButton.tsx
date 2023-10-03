import React from 'react';
import { useTranslate } from 'react-admin';
import PublishIcon from '@mui/icons-material/Check';

import ConfirmMutationButton from '../../../common/components/confirmMutationButton/ConfirmMutationButton';
import { AdminEvent } from '../types/EventTypes';
import usePublishEventMutation from '../hooks/usePublishEventMutation';

type Props = {
  record: AdminEvent;
  basePath?: string;
};

const EventPublishButton = ({ record, basePath = '/event' }: Props) => {
  const translate = useTranslate();
  const publishEventMutation = usePublishEventMutation({
    basePath,
    params: { id: record.id },
  });
  return (
    <ConfirmMutationButton
      buttonLabel="events.show.publish.button.label"
      icon={<PublishIcon />}
      mutation={publishEventMutation}
      confirmModalProps={{
        title: translate('events.show.publish.confirm.title', {
          eventName: record?.translations?.FI?.name,
        }),
        content: 'events.show.publish.confirm.content',
      }}
    />
  );
};

export default EventPublishButton;
