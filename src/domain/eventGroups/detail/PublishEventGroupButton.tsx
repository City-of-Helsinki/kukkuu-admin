import React from 'react';
import { useRecordContext, useTranslate } from 'react-admin';
import SendIcon from '@mui/icons-material/Check';

import ConfirmMutationButton from '../../../common/components/confirmMutationButton/ConfirmMutationButton';
import usePublishEventGroupMutation from '../hooks/usePublishEventGroupMutation';
import { EventGroup_eventGroup } from '../../../api/generatedTypes/EventGroup';

type Props = {
  /** @deprecated - create with useResourceContext instead. */
  basePath: string;
  className?: string;
  buttonLabel?: string;
};

const PublishEventGroupButton = ({
  basePath,
  className,
  buttonLabel = 'eventGroups.actions.publish.do',
}: Props) => {
  const t = useTranslate();
  const record = useRecordContext<EventGroup_eventGroup>();
  const publishEventGroupMutation = usePublishEventGroupMutation({
    basePath,
    params: { id: record.id },
  });

  return (
    <ConfirmMutationButton
      className={className}
      buttonLabel={buttonLabel}
      icon={<SendIcon />}
      mutation={publishEventGroupMutation}
      confirmModalProps={{
        title: t('eventGroups.actions.publish.confirm.title', {
          eventGroupName: record.name,
        }),
        content: 'eventGroups.actions.publish.confirm.content',
      }}
    />
  );
};

export default PublishEventGroupButton;
