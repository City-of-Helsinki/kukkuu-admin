import React from 'react';
import { ResourceComponentProps } from 'react-admin';

import KukkuuEditPage from '../../application/layout/kukkuuEditPage/KukkuuEditPage';
import MessageForm from '../form/MessageForm';

const MessagesEdit = (props: ResourceComponentProps) => {
  return (
    <KukkuuEditPage pageTitleSource="subject" reactAdminProps={props}>
      <MessageForm />
    </KukkuuEditPage>
  );
};

export default MessagesEdit;
