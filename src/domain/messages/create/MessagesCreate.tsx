import React from 'react';
import { useTranslate, ResourceComponentProps } from 'react-admin';
import { useLocation } from 'react-router';

import { ProtocolType } from '../../../api/generatedTypes/globalTypes';
import KukkuuCreatePage from '../../application/layout/kukkuuCreatePage/KukkuuCreatePage';
import KukkuuCreateToolbar from '../../application/layout/kukkuuCreatePage/KukkuuCreateToolbar';
import MessageForm from '../form/MessageForm';

const MessageCreate = (props: ResourceComponentProps) => {
  const t = useTranslate();
  const location = useLocation();
  const protocol = getProtocolFromSearch(location.search) || ProtocolType.EMAIL;

  return (
    <KukkuuCreatePage
      pageTitle={
        protocol === ProtocolType.SMS
          ? t('messages.create.title.sms')
          : t('messages.create.title.email')
      }
      reactAdminProps={{
        ...props,
        transform: (data) => ({
          ...data,
          protocol,
          sendDirectly: protocol === ProtocolType.SMS,
        }),
      }}
    >
      <MessageForm
        toolbar={
          <KukkuuCreateToolbar
            saveLabel={
              protocol === ProtocolType.SMS ? t('action.send') : undefined
            }
          />
        }
        redirect="list"
        protocol={protocol}
      />
    </KukkuuCreatePage>
  );
};

function getProtocolFromSearch(search: string): ProtocolType {
  return new URLSearchParams(search).get('protocol') as ProtocolType;
}

export default MessageCreate;
