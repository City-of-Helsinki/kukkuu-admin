import {
  EditButton,
  Button,
  TopToolbar,
  usePermissions,
  useRecordContext,
  useResourceContext,
  useTranslate,
} from 'react-admin';
import { Link } from 'react-router-dom';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import type { Permissions } from '../../authentication/authProvider';
import type { AdminEvent } from '../types/EventTypes';
import EventReadyToggle from './EventReadyToggle';
import EventPublishButton from './EventPublishButton';

const EventShowActions = () => {
  const record = useRecordContext<AdminEvent>();
  const resource = useResourceContext();
  const translate = useTranslate();
  const basePath = `/${resource}`;
  const hasEventGroup = Boolean(record?.eventGroup);
  const isPublished = Boolean(record?.publishedAt);
  const { permissions } = usePermissions<Permissions>();

  const canPublish = Boolean(
    permissions?.canPublishWithinProject?.(record?.project?.id)
  );

  return (
    <TopToolbar sx={{ alignItems: 'center' }}>
      {record && (
        <Button
          component={Link}
          to={`/events/create?copyFrom=${record.id}`}
          label={translate('events.actions.copy')}
        >
          <ContentCopyIcon />
        </Button>
      )}
      <EditButton record={record} />
      {record && !hasEventGroup && !isPublished && canPublish && (
        <EventPublishButton basePath={basePath} />
      )}
      {record && hasEventGroup && !isPublished && <EventReadyToggle />}
    </TopToolbar>
  );
};

export default EventShowActions;
