import React from 'react';
import { ResourceComponentProps } from 'react-admin';

import KukkuuEditPage from '../../../common/components/kukkuuEditPage/KukkuuEditPage';
import MessageForm from '../form/MessageForm';

const MessagesEdit = (props: ResourceComponentProps) => {
  return (
    <KukkuuEditPage reactAdminProps={props}>
      <MessageForm />
    </KukkuuEditPage>
  );
};

export default MessagesEdit;
