import React, { useEffect, useState } from 'react';
import { useTranslate, useNotify, useDataProvider, Loading } from 'react-admin';
import { RouteComponentProps } from 'react-router';
import * as Sentry from '@sentry/browser';
import { User } from 'oidc-client';

import authService from './authService';
import authorizationService from './authorizationService';
import AuthError from './AuthErrorPage';

function getRedirectPath(
  redirectTarget: string | undefined | string,
  currentPathname: string
): string {
  // If the redirectTarget is the same as the current pathname, redirect to
  // default view instead.
  if (!redirectTarget || redirectTarget === currentPathname) {
    return '/';
  }

  return redirectTarget;
}

type CallbackPageState = 'authentication' | 'authorization' | 'error';

function CallBackPage({
  history,
  location: { pathname },
}: RouteComponentProps) {
  const t = useTranslate();
  const notify = useNotify();
  const dataProvider = useDataProvider();
  const [phase, setPhase] = useState<CallbackPageState>('authentication');

  useEffect(() => {
    authService
      .endLogin()
      .then((user: User) => {
        setPhase('authorization');

        const role = authorizationService.getRole();

        if (role === 'none') {
          history.replace('/unauthorized');
        } else {
          history.replace(getRedirectPath(user.state?.path, pathname));
        }
      })
      .catch((error) => {
        setPhase('error');
        notify(t('ra.message.error'), 'warning');
        Sentry.captureException(error);
      });
  }, [dataProvider, history, notify, pathname, t]);

  return (
    <>
      {phase === 'authentication' && (
        <Loading loadingPrimary="authentication.callbackPage.finishingAuthentication" />
      )}
      {phase === 'authorization' && (
        <Loading loadingPrimary="authentication.callbackPage.authorization" />
      )}
      {phase === 'error' && <AuthError />}
    </>
  );
}

export default CallBackPage;
