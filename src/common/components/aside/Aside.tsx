import React from 'react';
import { useTranslate } from 'react-admin';
import Typography from '@mui/material/Typography';

type asideProps = {
  title?: string;
  content?: string;
};

const Aside = (props: asideProps) => {
  const translate = useTranslate();
  return (
    <div style={{ width: 256, margin: '1em' }}>
      {props.title ? (
        <Typography variant="h6">{translate(props.title)}</Typography>
      ) : null}
      {props.content ? (
        <Typography variant="body2">{translate(props.content)}</Typography>
      ) : null}
    </div>
  );
};

export default Aside;
