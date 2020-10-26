import React from 'react';
import { ResourceComponentProps } from 'react-admin';

import useTranslationDataKey from '../../../common/hooks/useTranslationDataKey';
import KukkuuEditPage from '../../../common/components/kukkuuEditPage/KukkuuEditPage';
import MessageForm from '../form/MessageForm';

const MessagesEdit = (props: ResourceComponentProps) => {
  const getKey = useTranslationDataKey();

  return (
    <KukkuuEditPage pageTitleSource={getKey('subject')} reactAdminProps={props}>
      <MessageForm />
    </KukkuuEditPage>
  );
};

export default MessagesEdit;
