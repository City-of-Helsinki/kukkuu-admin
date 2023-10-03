import React, { useState } from 'react';
import { useTranslate } from 'react-admin';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

import { AdminEvent } from '../types/EventTypes';
import useSetReadyMutation from '../hooks/useSetReadyMutation';

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
  const { mutate: setReady, data, isLoading } = useSetReadyMutation();

  const readyForEventGroupPublishing = getReadyStatus(
    record.readyForEventGroupPublishing,
    isReadyLocal,
    isLoading,
    data?.data?.readyForEventGroupPublishing
  );

  const handleClick = () => {
    setReadyLocal(!readyForEventGroupPublishing);
    setReady({
      id: record.id,
      readyForEventGroupPublishing: !readyForEventGroupPublishing,
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
