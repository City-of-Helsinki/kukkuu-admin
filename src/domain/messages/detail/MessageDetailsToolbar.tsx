import React from 'react';
import {
  useTranslate,
  DeleteButton,
  EditButton,
  TopToolbar,
  useResourceContext,
  useRecordContext,
  usePermissions,
} from 'react-admin';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';

import { toDateTimeString } from '../../../common/utils';
import MessageSendButton from './MessageSendButton';
import {
  RecipientSelectionEnum,
  type MessageNode,
} from '../../api/generatedTypes/graphql';
import type { Permissions } from '../../authentication/authProvider';
import projectService from '../../projects/projectService';

const useMessageDetailsToolbarStyles = makeStyles((theme) => ({
  wrapper: {
    marginBottom: theme.spacing(3),
  },
  meta: {
    fontSize: theme.typography.body2.fontSize,
  },
  metaTitle: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.body2.fontSize,
  },
  sendButton: {
    marginLeft: theme.spacing(1),
  },
}));

/**
 * If the message is set to be sent to "all" recipients and user doesn't
 * have permissions to send to "all", the Message editing should be prevented.
 * Also, the message must be for the current project that is active in
 * the React-Admin UI.
 */
const useResolveEditPermission = () => {
  const record = useRecordContext<MessageNode>();
  const projectId = projectService.projectId ?? '';
  const isMessageOfCurrentProject = Boolean(projectId === record?.project?.id);
  const { permissions, isLoading } = usePermissions<Permissions>();
  const canSendMessagesToAllRecipientsWithinProject = Boolean(
    permissions?.canSendMessagesToAllRecipientsWithinProject?.(projectId)
  );
  const rejectIfForAll = Boolean(
    record?.recipientSelection?.toUpperCase() === RecipientSelectionEnum.All &&
      !canSendMessagesToAllRecipientsWithinProject
  );
  // Record (message) available,
  // the message is for current active project and
  // if it is for "all" recipients, user must have permissions to send for "all".
  const hasEditPermission =
    Boolean(record) && isMessageOfCurrentProject && !rejectIfForAll;

  return {
    hasEditPermission,
    isLoading,
  };
};

const MessageDetailToolbar = () => {
  const record = useRecordContext<MessageNode>();
  const resource = useResourceContext();
  const basePath = `/${resource}`;
  const classes = useMessageDetailsToolbarStyles();
  const t = useTranslate();
  const { hasEditPermission, isLoading: isLoadingPermissions } =
    useResolveEditPermission();
  const isSent = Boolean(record?.sentAt);

  if (isSent) {
    return (
      <div className={classes.wrapper}>
        <Typography className={classes.meta}>
          <Typography component="span" className={classes.metaTitle}>
            {t('messages.fields.sentAt.sent')}
          </Typography>
          {` ${toDateTimeString(new Date(record?.sentAt))}`}
        </Typography>
        <Typography className={classes.meta}>
          <Typography component="span" className={classes.metaTitle}>
            {t('messages.fields.recipientCount.label')}
          </Typography>
          {` ${record?.recipientCount}`}
        </Typography>
      </div>
    );
  }

  // Don't render a toolbar with edit actions,
  // if permissions loading is still ongoing or user does not have
  // edit permissions for current record.
  if (!record || isLoadingPermissions || !hasEditPermission) {
    return null;
  }

  return (
    <TopToolbar>
      <EditButton record={record} />
      <DeleteButton mutationMode="pessimistic" record={record} />
      {basePath && <MessageSendButton className={classes.sendButton} />}
    </TopToolbar>
  );
};

export default MessageDetailToolbar;
