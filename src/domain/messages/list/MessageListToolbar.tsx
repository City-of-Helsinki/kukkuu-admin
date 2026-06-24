import { useTranslate, TopToolbar, CreateButton } from 'react-admin';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';

const MessagesListToolbar = () => {
  const t = useTranslate();

  return (
    <TopToolbar
      sx={(theme) => ({
        margin: `0 -${theme.spacing(1)}`,
        '& > *': { margin: `0 ${theme.spacing(1)}` },
      })}
    >
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
    </TopToolbar>
  );
};

export default MessagesListToolbar;
