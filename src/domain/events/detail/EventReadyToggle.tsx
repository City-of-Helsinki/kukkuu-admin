import React from 'react';
import { useMutation, useTranslate } from 'react-admin';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { AdminEvent } from '../types/EventTypes';

type Props = {
  record: AdminEvent;
  className?: string;
};

const EventReadyToggle = ({ record, className }: Props) => {
  const t = useTranslate();
  const [setReady] = useMutation({
    type: 'setReady',
    resource: 'events',
    payload: { id: record.id },
  });

  const handleClick = () => {
    setReady();
  };

  return (
    <FormControlLabel
      className={className}
      control={
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        <Switch checked={Boolean(record.ready)} onClick={handleClick} />
      }
      label={t('events.fields.ready.label')}
      labelPlacement="start"
    />
  );
};

export default EventReadyToggle;
