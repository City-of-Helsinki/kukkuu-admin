import React from 'react';
import { useTranslate } from 'react-admin';
import { useLocation } from 'react-router';

import KukkuuCreatePage from '../../application/layout/kukkuuCreatePage/KukkuuCreatePage';
import KukkuuCreateToolbar from '../../application/layout/kukkuuCreatePage/KukkuuCreateToolbar';
import MessageForm from '../form/MessageForm';
import { ProtocolType } from '../../api/generatedTypes/graphql';

const MessageCreate = () => {
  const t = useTranslate();
  const location = useLocation();
  const protocol = getProtocolFromSearch(location.search) || ProtocolType.Email;

  return (
    <KukkuuCreatePage
      pageTitle={
        protocol === ProtocolType.Sms
          ? t('messages.create.title.sms')
          : t('messages.create.title.email')
      }
      reactAdminProps={{
        transform: (data) => ({
          ...data,
          protocol,
          sendDirectly: protocol === ProtocolType.Sms,
        }),
        redirect: 'list',
      }}
    >
      <MessageForm
        toolbar={
          <KukkuuCreateToolbar
            saveLabel={
              protocol === ProtocolType.Sms ? t('action.send') : undefined
            }
          />
        }
        protocol={protocol}
      />
    </KukkuuCreatePage>
  );
};

function getProtocolFromSearch(search: string): ProtocolType {
  return new URLSearchParams(search).get('protocol') as ProtocolType;
}

export default MessageCreate;
