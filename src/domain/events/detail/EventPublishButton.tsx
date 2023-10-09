import React from 'react';
import { useTranslate } from 'react-admin';
import PublishIcon from '@mui/icons-material/Check';

import ConfirmMutationButton from '../../../common/components/confirmMutationButton/ConfirmMutationButton';
import { AdminEvent } from '../types/EventTypes';

type Props = {
  record?: AdminEvent;
  basePath?: string;
};

const EventPublishButton = ({ record, basePath = '/event' }: Props) => {
  const translate = useTranslate();

  return (
    <ConfirmMutationButton
      basePath={basePath}
      buttonLabel="events.show.publish.button.label"
      icon={<PublishIcon />}
      successMessage="events.show.publish.onSuccess.message"
      errorMessage="events.show.publish.onSuccess.message"
      mutation={{
        type: 'publish',
        resource: 'events',
        payload: { id: record?.id },
      }}
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
