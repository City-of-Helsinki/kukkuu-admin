import React, { useEffect, useState } from 'react';
import { useTranslate, useDataProvider, Loading } from 'react-admin';
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

function CallBackPage({
  history,
  location: { pathname },
}: RouteComponentProps) {
  const t = useTranslate();
  const dataProvider = useDataProvider();
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    authService
      .endLogin()
      .then((user: User) => {
        const role = authorizationService.getRole();

        if (role === 'none') {
          history.replace('/unauthorized');
        } else {
          history.replace(getRedirectPath(user.state?.path, pathname));
        }
      })
      .catch((error) => {
        setError(error);
        // Clear auth state from the failed login attempt
        authService.resetAuthState();
        Sentry.captureException(error);
      });
  }, [dataProvider, history, pathname, t]);

  if (error) {
    return <AuthError />;
  }

  return (
    <Loading loadingPrimary="authentication.callbackPage.finishingAuthentication" />
  );
}

export default CallBackPage;
