import { useRecordContext, useTranslate } from 'react-admin';
import SendIcon from '@mui/icons-material/Check';

import PublishDialogButton from '../../../common/components/publishDialog/PublishDialogButton';
import usePublishEventGroupMutation from '../hooks/usePublishEventGroupMutation';
import type { EventGroupNode } from '../../api/generatedTypes/graphql';

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
  const record = useRecordContext<EventGroupNode>();
  const publishEventGroupMutation = usePublishEventGroupMutation({
    basePath,
    params: { id: record?.id ?? '' },
  });

  if (!record) return null;

  return (
    <PublishDialogButton
      className={className}
      buttonLabel={buttonLabel}
      icon={<SendIcon />}
      mutation={publishEventGroupMutation}
      dialogProps={{
        title: t('eventGroups.actions.publish.confirm.title', {
          eventGroupName: record?.name,
        }),
        content: 'eventGroups.actions.publish.confirm.content',
        registrationOpensAtHelperText:
          'eventGroups.actions.publish.confirm.registrationOpensAtHelperText',
      }}
    />
  );
};

export default PublishEventGroupButton;
