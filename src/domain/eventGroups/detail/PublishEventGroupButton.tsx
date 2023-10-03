import React from 'react';
import { useTranslate } from 'react-admin';
import SendIcon from '@mui/icons-material/Check';

import ConfirmMutationButton from '../../../common/components/confirmMutationButton/ConfirmMutationButton';
import usePublishEventGroupMutation from '../hooks/usePublishEventGroupMutation';

type EvenGroup = {
  id: string;
  name: string;
};

type Props = {
  basePath: string;
  record: EvenGroup;
  className?: string;
  buttonLabel?: string;
};

const PublishEventGroupButton = ({
  basePath,
  record,
  className,
  buttonLabel = 'eventGroups.actions.publish.do',
}: Props) => {
  const t = useTranslate();

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
