import React, { useState } from 'react';
import { useMutation, useTranslate } from 'react-admin';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { AdminEvent } from '../types/EventTypes';

function getReadyStatus(
  readyInitial: boolean,
  readyLocal: boolean,
  loading: boolean,
  readyRemote?: boolean
): boolean {
  if (readyRemote !== undefined) {
    return readyRemote;
  }

  if (loading) {
    return readyLocal;
  }

  return readyInitial;
}

type Props = {
  record: AdminEvent;
  className?: string;
};

const EventReadyToggle = ({ record, className }: Props) => {
  const t = useTranslate();
  const [isReadyLocal, setReadyLocal] = useState(
    record.readyForEventGroupPublishing
  );
  const [setReady, { data, loading }] = useMutation();

  const readyForEventGroupPublishing = getReadyStatus(
    record.readyForEventGroupPublishing,
    isReadyLocal,
    loading,
    data?.readyForEventGroupPublishing
  );

  const handleClick = () => {
    setReadyLocal(!readyForEventGroupPublishing);
    setReady({
      type: 'setReady',
      resource: 'events',
      payload: {
        id: record.id,
        readyForEventGroupPublishing: !readyForEventGroupPublishing,
      },
    });
  };

  return (
    <FormControlLabel
      className={className}
      control={
        <Switch checked={readyForEventGroupPublishing} onClick={handleClick} />
      }
      label={t('events.fields.ready.label')}
      labelPlacement="start"
    />
  );
};

export default EventReadyToggle;
