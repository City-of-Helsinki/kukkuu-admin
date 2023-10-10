import React from 'react';

import KukkuuEditPage from '../../application/layout/kukkuuEditPage/KukkuuEditPage';
import MessageForm from '../form/MessageForm';
import TranslatableProvider from '../../../common/providers/TranslatableProvider';

const MessagesEdit = () => {
  return (
    <KukkuuEditPage pageTitleSource="subject">
      <TranslatableProvider>
        <MessageForm />
      </TranslatableProvider>
    </KukkuuEditPage>
  );
};

export default MessagesEdit;
