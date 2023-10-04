import React from 'react';
import { useRecordContext, useTranslate } from 'react-admin';
import PublishIcon from '@mui/icons-material/Check';

import ConfirmMutationButton from '../../../common/components/confirmMutationButton/ConfirmMutationButton';
import { AdminEvent } from '../types/EventTypes';
import usePublishEventMutation from '../hooks/usePublishEventMutation';

type Props = {
  /** @deprecated - create with useResourceContext instead. */
  basePath?: string;
};

const EventPublishButton = ({ basePath = '/event' }: Props) => {
  const record = useRecordContext<AdminEvent>();
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
