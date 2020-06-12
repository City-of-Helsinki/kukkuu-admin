import React from 'react';
import {
  useTranslate,
  useNotify,
  useDataProvider,
  useLogout,
} from 'react-admin';
import { CallbackComponent } from 'redux-oidc';
import { User } from 'oidc-client';
import { RouteChildrenProps } from 'react-router';
import * as Sentry from '@sentry/browser';

import userManager from '../userManager';
import { fetchApiToken } from '../api';
import { setAdminProfile } from '../../profile/utils';

function OidcCallback(props: RouteChildrenProps) {
  const translate = useTranslate();
  const notify = useNotify();
  const dataProvider = useDataProvider();
  const logout = useLogout();

  const handleError = (error: Error) => {
    localStorage.setItem('fetchingApiToken', '0');
    notify(translate('ra.message.error'), 'warning');
    Sentry.captureException(error);
    console.error('OidcCallback handleError', error);
    logout();
  };

  const onSuccess = (user: User) => {
    localStorage.setItem('fetchingApiToken', '1');

    fetchApiToken(user.access_token)
      .then((apiToken) => {
        console.count('OidcCallback onSuccess fetchApiToken');
        localStorage.setItem('apiToken', apiToken);
        localStorage.setItem('fetchingApiToken', '0');
        return dataProvider.getMyAdminProfile();
      })
      .then(({ data }) => {
        setAdminProfile(data);
        props.history.push('/');
      })
      .catch((error) => {
        console.error(
          'OidcCallback onSuccess fetchApiToken fetchApiToken caught error'
        );
        handleError(error);
      });
  };
  const onError = (error: Error) => {
    handleError(error);
  };

  return (
    <CallbackComponent
      successCallback={onSuccess}
      errorCallback={onError}
      userManager={userManager}
    >
      <p>{translate('authentication.redirect.text')}</p>
    </CallbackComponent>
  );
}

export default OidcCallback;
