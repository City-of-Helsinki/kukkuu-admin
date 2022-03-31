import React from 'react';
import { Record, useTranslate } from 'react-admin';
import { makeStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import PublicIcon from '@material-ui/icons/Public';

const useStyles = makeStyles((theme) => ({
  iconWithBackground: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '20px',
    width: '20px',
    color: '#fff',
    borderRadius: '100%',
    backgroundColor: theme.palette.grey[500],
    '&.is-ready': {
      backgroundColor: theme.palette.success.dark,
    },
    '&.is-published': {
      backgroundColor: theme.palette.info.dark,
    },
  },
}));

type Props = {
  record?: Record;
  className: string;
};

const EventReadyField = ({ record, className }: Props) => {
  const classes = useStyles();
  const t = useTranslate();
  const isReady = Boolean(record?.readyForEventGroupPublishing);
  const isPublished = Boolean(record?.publishedAt);
  const classNames = [
    classes.iconWithBackground,
    isReady ? 'is-ready' : null,
    isPublished ? 'is-published' : null,
    className,
  ]
    .filter(Boolean)
    .join(' ');

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

  return <div className={classNames}>{getEventStatusIcon()}</div>;
};

export default EventReadyField;
