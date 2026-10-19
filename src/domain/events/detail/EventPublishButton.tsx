import { useRecordContext, useTranslate } from 'react-admin';
import PublishIcon from '@mui/icons-material/Check';

import PublishDialogButton from '../../../common/components/publishDialog/PublishDialogButton';
import type { AdminEvent } from '../types/EventTypes';
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
    params: { id: record?.id ?? '' },
  });

  if (!record) return null;
  return (
    <PublishDialogButton
      buttonLabel="events.show.publish.button.label"
      icon={<PublishIcon />}
      mutation={publishEventMutation}
      dialogProps={{
        title: translate('events.show.publish.confirm.title', {
          eventName: record?.translations?.FI?.name,
        }),
        content: 'events.show.publish.confirm.content',
        registrationOpensAtHelperText:
          'events.show.publish.confirm.registrationOpensAtHelperText',
      }}
    />
  );
};

export default EventPublishButton;
