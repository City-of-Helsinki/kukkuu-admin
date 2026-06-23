import React from 'react';
import {
  Toolbar,
  SaveButton,
  useTranslate,
  useResourceContext,
} from 'react-admin';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function CancelButton() {
  const t = useTranslate();
  const resource = useResourceContext();
  const basePath = `/${resource}`;
  return (
    <Button component={Link} to={{ pathname: basePath }} variant="contained">
      {t('ra.action.cancel')}
    </Button>
  );
}

type KukkuuCreateToolbarProps = React.ComponentProps<typeof Toolbar> & {
  saveLabel?: string;
};

function KukkuuCreateToolbar({
  saveLabel,
  ...delegatedProps
}: KukkuuCreateToolbarProps) {
  return (
    <Toolbar
      {...delegatedProps}
      sx={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <SaveButton label={saveLabel} />
      <CancelButton />
    </Toolbar>
  );
}

export default KukkuuCreateToolbar;
