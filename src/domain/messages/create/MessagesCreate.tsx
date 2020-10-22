import React from 'react';
import { useTranslate, ResourceComponentProps } from 'react-admin';

import KukkuuCreatePage from '../../../common/components/kukkuuCreatePage/KukkuuCreatePage';
import KukkuuCreateToolbar from '../../../common/components/kukkuuCreateToolbar/KukkuuCreateToolbar';
import MessageForm from '../form/MessageForm';

const MessageCreate = (props: ResourceComponentProps) => {
  const t = useTranslate();

  return (
    <KukkuuCreatePage
      pageTitle={t('messages.create.title')}
      reactAdminProps={props}
    >
      <MessageForm toolbar={<KukkuuCreateToolbar />} redirect="list" />
    </KukkuuCreatePage>
  );
};

export default MessageCreate;
