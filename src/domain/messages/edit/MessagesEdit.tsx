import React from 'react';

import KukkuuEditPage from '../../application/layout/kukkuuEditPage/KukkuuEditPage';
import MessageForm from '../form/MessageForm';

const MessagesEdit = () => {
  return (
    <KukkuuEditPage pageTitleSource="subject">
      <MessageForm />
    </KukkuuEditPage>
  );
};

export default MessagesEdit;
