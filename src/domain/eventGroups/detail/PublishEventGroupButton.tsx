import React from 'react';
import { useTranslate } from 'react-admin';
import SendIcon from '@material-ui/icons/Check';

import ConfirmMutationButton from '../../../common/components/confirmMutationButton/ConfirmMutationButton';

type EvenGroup = {
  id: string;
  name: string;
};

type Props = {
  basePath: string;
  record: EvenGroup;
  className?: string;
};

const PublishEventGroupButton = ({ basePath, record, className }: Props) => {
  const t = useTranslate();

  return (
    <ConfirmMutationButton
      basePath={basePath}
      className={className}
      buttonLabel="eventGroups.actions.publish.do"
      icon={<SendIcon />}
      successMessage="eventGroups.actions.publish.success"
      errorMessage="eventGroups.actions.publish.error"
      mutation={{
        type: 'publish',
        resource: 'event-groups',
        payload: { id: record.id },
      }}
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
