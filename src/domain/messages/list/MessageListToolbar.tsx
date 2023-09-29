import React from 'react';
import { useTranslate, TopToolbar, CreateButton } from 'react-admin';
import { makeStyles } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';

const useMessagesListToolbarStyles = makeStyles((theme) => ({
  toolbar: {
    margin: `0 -${theme.spacing(1)}`,
    '& > *': {
      margin: `0 ${theme.spacing(1)}`,
    },
  },
}));

const MessagesListToolbar = () => {
  const t = useTranslate();
  const classes = useMessagesListToolbarStyles();

  return (
    <TopToolbar className={classes.toolbar}>
      <CreateButton
        basePath="messages"
        to="/messages/create"
        label={t('messages.create.do.email')}
        icon={<MailOutlineIcon />}
      />
      <CreateButton
        basePath="messages"
        to="/messages/create?protocol=SMS"
        label={t('messages.create.do.sms')}
        icon={<TextsmsOutlinedIcon />}
      />
    </TopToolbar>
  );
};

export default MessagesListToolbar;
