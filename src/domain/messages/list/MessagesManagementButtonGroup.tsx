import React from 'react';
import { useTranslate, CreateButton } from 'react-admin';
import type { CreateButtonProps } from 'react-admin';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';

export const MessagesManagementButtonGroup = ({
  variant,
}: {
  variant?: CreateButtonProps['variant'];
}) => {
  const t = useTranslate();
  return (
    <>
      <CreateButton
        to="/messages/create"
        label={t('messages.create.do.email')}
        icon={<MailOutlineIcon />}
      />
      <CreateButton
        to="/messages/create?protocol=SMS"
        label={t('messages.create.do.sms')}
        icon={<TextsmsOutlinedIcon />}
      />
    </>
  );
};
