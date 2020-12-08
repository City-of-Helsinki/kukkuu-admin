import React from 'react';
import { Record, useTranslate } from 'react-admin';
import { makeStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';

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
  },
}));

type Props = {
  record?: Record;
  className: string;
};

const EventReadyField = ({ record, className }: Props) => {
  const classes = useStyles();
  const t = useTranslate();
  const isReady = Boolean(record?.ready);
  const classNames = [
    classes.iconWithBackground,
    isReady ? 'is-ready' : null,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}>
      {isReady && (
        <CheckIcon
          style={{ fontSize: 14 }}
          titleAccess={t('events.fields.ready.options.ready')}
          role="img"
        />
      )}
      {!isReady && (
        <EditIcon
          style={{ fontSize: 14 }}
          titleAccess={t('events.fields.ready.options.notReady')}
          role="img"
        />
      )}
    </div>
  );
};

export default EventReadyField;
