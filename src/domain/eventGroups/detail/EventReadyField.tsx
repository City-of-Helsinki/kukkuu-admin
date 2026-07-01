import React from 'react';
import { useTranslate } from 'react-admin';
import { useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import PublicIcon from '@mui/icons-material/Public';

import type { EventNode } from '../../api/generatedTypes/graphql';

type Props = {
  record?: EventNode;
  className?: string;
  style?: React.CSSProperties;
};

const EventReadyField = ({ record, className, style }: Props) => {
  const t = useTranslate();
  const theme = useTheme();
  const isReady = Boolean(record?.readyForEventGroupPublishing);
  const isPublished = Boolean(record?.publishedAt);

  const backgroundColor = isPublished
    ? theme.palette.info.dark
    : isReady
      ? theme.palette.success.dark
      : theme.palette.grey[500];

  const getEventStatusIcon = () => {
    if (isPublished) {
      return (
        <PublicIcon
          style={{ fontSize: 14 }}
          titleAccess={t('events.fields.ready.options.published')}
          role="img"
        />
      );
    } else if (isReady) {
      return (
        <CheckIcon
          style={{ fontSize: 14 }}
          titleAccess={t('events.fields.ready.options.ready')}
          role="img"
        />
      );
    } else {
      return (
        <EditIcon
          style={{ fontSize: 14 }}
          titleAccess={t('events.fields.ready.options.notReady')}
          role="img"
        />
      );
    }
  };

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '20px',
        width: '20px',
        color: '#fff',
        borderRadius: '100%',
        backgroundColor,
        ...style,
      }}
    >
      {getEventStatusIcon()}
    </div>
  );
};

export default EventReadyField;
