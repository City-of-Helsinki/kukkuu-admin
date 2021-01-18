import React, { useEffect } from 'react';
import {
  useTranslate,
  useNotify,
  useDataProvider,
  useLogout,
} from 'react-admin';
import { RouteComponentProps } from 'react-router';
import * as Sentry from '@sentry/browser';
import { User } from 'oidc-client';

import authService from './authService';
import authorizationService from './authorizationService';

function CallBackPage({ history }: RouteComponentProps) {
  const t = useTranslate();
  const notify = useNotify();
  const dataProvider = useDataProvider();
  const logout = useLogout();

  useEffect(() => {
    authService
      .endLogin()
      .then((user: User) => {
        const role = authorizationService.getRole();

        if (role === 'none') {
          history.push('/unauthorized');
        } else {
          history.replace(user?.state.path);
        }
      })
      .catch((error) => {
        notify(t('ra.message.error'), 'warning');
        Sentry.captureException(error);
        logout();
      });
  }, [dataProvider, history, logout, notify, t]);

  return <p>{t('authentication.redirect.text')}</p>;
}

export default CallBackPage;
